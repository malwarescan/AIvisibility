import axios from "axios";
import * as cheerio from "cheerio";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export function extractMetaFromHtml(html: string): { title: string; description: string } {
  const $ = cheerio.load(html);

  // Title logic - try title tag first, then H1, then H2
  const titleTag = $("title").first().text().trim();
  const h1 = $("h1").first().text().trim();
  const h2 = $("h2").first().text().trim();
  const fallbackTitle = h1 || h2;
  const title = titleTag || fallbackTitle || "Page Title";

  // Description logic - try meta description first, then first paragraph
  const metaDescription = $('meta[name="description"]').attr("content")?.trim();
  const ogDescription = $('meta[property="og:description"]').attr("content")?.trim();
  const firstParagraph = $("p").first().text().trim();
  const description = metaDescription || ogDescription || firstParagraph || "Page description";

  return { title, description };
}

export async function generateMetaFromUrl(url: string): Promise<{ title: string, description: string }> {
  try {
    const { data: html } = await axios.get(url, {
      headers: { 
        "User-Agent": "SchemaOptimizerBot/1.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        "Connection": "keep-alive",
      },
      timeout: 10000
    });

    // Extract basic metadata from HTML
    const { title, description } = extractMetaFromHtml(html);
    
    const $ = cheerio.load(html);
    const internalAnchors = $("a[href^='/']")
      .slice(0, 5)
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean)
      .join(", ");

    const prompt = `
You are an SEO expert trained to optimize content for Google AI Overviews and zero-click search.

Given the following:

- Page URL: ${url}
- Extracted Title: ${title}
- Extracted Description: ${description}
- Internal Anchors: ${internalAnchors}

Generate:
1. A page title under 60 characters, rich with intent-based keywords
2. A meta description under 160 characters, natural and persuasive

Both must:
- Match user intent behind searches like "transfer a domain to [brand]"
- Be keyword-rich but natural
- Use click-worthy, voice-optimized language
- Optimize for AI Overviews and featured snippets

Output format:
Title: [text]
Description: [text]
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4
    });

    const content = response.choices[0].message.content || "";
    const titleMatch = content.match(/Title:\s*(.+)/i);
    const descMatch = content.match(/Description:\s*(.+)/i);

    return {
      title: titleMatch?.[1]?.trim() || title,
      description: descMatch?.[1]?.trim() || description
    };

  } catch (err) {
    console.error("Error generating meta:", err);
    // Return extracted metadata even if AI enhancement fails
    try {
      const { data: html } = await axios.get(url, {
        headers: { 
          "User-Agent": "Mozilla/5.0 (compatible; SchemaOptimizerBot/1.0)",
        },
        timeout: 5000
      });
      return extractMetaFromHtml(html);
    } catch (fallbackErr) {
      console.error("Fallback extraction failed:", fallbackErr);
      return { title: "Page Title", description: "Page description" };
    }
  }
}

export async function generateEnhancedSchema(url: string, targetQuery: string): Promise<{
  title: string;
  description: string;
  enhancedSchema: any;
}> {
  try {
    // Generate meta first
    const meta = await generateMetaFromUrl(url);
    
    // Extract domain for organization info
    const domain = new URL(url).hostname;
    
    // Generate enhanced schema with all the improvements
    const enhancedSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": meta.title,
      "description": meta.description,
      "url": url,
      "author": {
        "@type": "Organization",
        "name": domain.replace('www.', ''),
        "url": `https://${domain}`,
        "logo": {
          "@type": "ImageObject",
          "url": `https://${domain}/logo.png`
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": domain.replace('www.', ''),
        "url": `https://${domain}`,
        "logo": {
          "@type": "ImageObject",
          "url": `https://${domain}/logo.png`
        }
      },
      "mainEntity": [
        {
          "@type": "HowTo",
          "name": `How to Transfer Your Domain to ${domain.replace('www.', '')}`,
          "description": meta.description,
          "image": {
            "@type": "ImageObject",
            "url": `https://${domain}/domain-transfer-guide.jpg`,
            "width": 1200,
            "height": 630
          },
          "step": [
            {
              "@type": "HowToStep",
              "name": "Step 1: Prepare your domain",
              "text": "Ensure your domain is unlocked and you have access to the admin email. Remove any privacy protection if enabled.",
              "estimatedTime": "PT2M",
              "tool": "Domain control panel",
              "image": {
                "@type": "ImageObject",
                "url": `https://${domain}/step1-prepare-domain.jpg`,
                "width": 800,
                "height": 600
              }
            },
            {
              "@type": "HowToStep",
              "name": "Step 2: Get authorization code",
              "text": "Log in to your current registrar, navigate to your domain settings, and request the EPP or authorization code. This is required to initiate the transfer.",
              "estimatedTime": "PT5M",
              "tool": "Domain control panel",
              "image": {
                "@type": "ImageObject",
                "url": `https://${domain}/step2-auth-code.jpg`,
                "width": 800,
                "height": 600
              }
            },
            {
              "@type": "HowToStep",
              "name": "Step 3: Start the transfer process",
              "text": "Enter your domain name and authorization code on the transfer page. Follow the prompts to complete the transfer request.",
              "estimatedTime": "PT3M",
              "tool": "Transfer interface",
              "image": {
                "@type": "ImageObject",
                "url": `https://${domain}/step3-transfer-process.jpg`,
                "width": 800,
                "height": 600
              }
            }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can I transfer my domain at any time?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, you can transfer your domain at any time. Just make sure it's not within 60 days of registration or another recent transfer, as most registrars restrict that."
              }
            },
            {
              "@type": "Question",
              "name": "How long does a domain transfer take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Domain transfers typically take 5-7 days to complete. The process involves approval from your current registrar and DNS propagation."
              }
            },
            {
              "@type": "Question",
              "name": "Will my website be down during transfer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No, your website will remain active during the transfer process. DNS changes only occur after the transfer is complete."
              }
            }
          ]
        },
        {
          "@type": "Offer",
          "name": "Domain Transfer Service",
          "description": "Professional domain transfer service with competitive pricing",
          "price": "8.99",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": domain.replace('www.', ''),
            "url": `https://${domain}`
          }
        }
      ],
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `https://${domain}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Domain Transfer",
            "item": url
          }
        ]
      },
      "potentialAction": {
        "@type": "Action",
        "name": "Start domain transfer",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": url
        }
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [
          "h1.domain-transfer-title",
          ".domain-transfer-content",
          ".how-to-steps",
          ".faq-section"
        ]
      }
    };

    return {
      title: meta.title,
      description: meta.description,
      enhancedSchema
    };

  } catch (error) {
    console.error("Error generating enhanced schema:", error);
    throw error;
  }
} 