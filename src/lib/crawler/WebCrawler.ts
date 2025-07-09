// Custom Web Crawler for Authority Analysis
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'
import { promisify } from 'util'

export interface WebsiteData {
  performance: {
    loadTime: number
    responseTime: number
    statusCode: number
    redirectChain: number
  }
  technical: {
    coreWebVitals: any
    viewport: any
    isMobileOptimized: boolean
    images: any
    resources: any
  }
  content: {
    wordCount: number
    readabilityScore: number
    contentLength: number
    headingStructure: {
      h1: string[]
      h2: string[]
      h3: string[]
      h4: string[]
      h5: string[]
      h6: string[]
    }
    paragraphCount: number
    listCount: number
    imageCount: number
    linkCount: number
    topicalRelevance: any
    contentFreshness: any
    authorCredentials: any
  }
  seo: any
  security: any
  aiFactors: {
    schemaMarkup: any
    jsonLd: any
    microdata: any
    faqStructure: any
    tableData: any
    codeBlocks: number
    citations: any
    externalReferences: any
    topicCluster: any
    chatGPTFactors: any
    claudeFactors: any
    perplexityFactors: any
  }
}

export class WebsiteCrawler {
  private browser: any = null

  async initBrowser() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
  }

  async crawlWebsite(url: string): Promise<WebsiteData> {
    const page = await this.browser.newPage()
    
    try {
      // Set realistic user agent
      await page.setUserAgent('Mozilla/5.0 (compatible; NeuralCommandBot/1.0; +https://neuralcommandllc.com/bot)')
      
      // Set page timeout and error handling
      page.setDefaultTimeout(60000)
      page.setDefaultNavigationTimeout(60000)
      
      // Crawl with performance metrics
      const startTime = Date.now()
      const response = await page.goto(url, { 
        waitUntil: 'domcontentloaded',
        timeout: 60000 
      }).catch(async (error: any) => {
        console.warn(`Navigation timeout for ${url}, trying with shorter timeout...`)
        try {
          return await page.goto(url, { 
            waitUntil: 'load',
            timeout: 30000 
          })
        } catch (fallbackError: any) {
          console.warn(`Fallback timeout for ${url}, using minimal navigation...`)
          return await page.goto(url, { 
            waitUntil: 'domcontentloaded',
            timeout: 15000 
          })
        }
      })
      const loadTime = Date.now() - startTime

      // Get page content
      const html = await page.content()
      const $ = cheerio.load(html)

      // Extract comprehensive data
      const analysis = {
        // Performance Data
        performance: {
          loadTime,
          responseTime: response?.request()?.response()?.timing() || 0,
          statusCode: response?.status() || 0,
          redirectChain: response?.request()?.redirectChain()?.length || 0
        },

        // Technical Analysis
        technical: await this.analyzeTechnical(page, $),
        
        // Content Analysis  
        content: await this.analyzeContent($, html),
        
        // SEO Analysis
        seo: await this.analyzeSEO($),
        
        // Security Analysis
        security: await this.analyzeSecurity(url, page),
        
        // AI-Specific Factors
        aiFactors: await this.analyzeAIFactors($, html)
      }

      return analysis
    } finally {
      await page.close()
    }
  }

  async analyzeTechnical(page: any, $: any) {
    return {
      // Core Web Vitals (real measurement)
      coreWebVitals: await page.evaluate(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((list) => {
            const vitals: any = {}
            for (const entry of list.getEntries()) {
              if (entry.name === 'largest-contentful-paint') {
                vitals.lcp = entry.startTime
              }
              if (entry.name === 'first-input-delay') {
                vitals.fid = entry.duration
              }
              if (entry.name === 'cumulative-layout-shift') {
                vitals.cls = (entry as any).value
              }
            }
            resolve(vitals)
          }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
          
          setTimeout(() => resolve({}), 5000) // Fallback
        })
      }),

      // Mobile optimization
      viewport: await page.viewport(),
      isMobileOptimized: $('meta[name="viewport"]').length > 0,
      
      // Image optimization
      images: this.analyzeImages($),
      
      // JavaScript/CSS analysis
      resources: await this.analyzeResources(page)
    }
  }

  async analyzeContent($: any, html: string) {
    const text = $.text()
    
    return {
      // Basic content metrics
      wordCount: text.split(/\s+/).length,
      readabilityScore: this.calculateReadability(text),
      contentLength: html.length,
      
      // Structure analysis
      headingStructure: {
        h1: $('h1').map((i: any, el: any) => $(el).text()).get(),
        h2: $('h2').map((i: any, el: any) => $(el).text()).get(),
        h3: $('h3').map((i: any, el: any) => $(el).text()).get(),
        h4: $('h4').map((i: any, el: any) => $(el).text()).get(),
        h5: $('h5').map((i: any, el: any) => $(el).text()).get(),
        h6: $('h6').map((i: any, el: any) => $(el).text()).get()
      },
      
      // Content quality indicators
      paragraphCount: $('p').length,
      listCount: $('ul, ol').length,
      imageCount: $('img').length,
      linkCount: $('a').length,
      
      // AI-relevant content factors
      topicalRelevance: await this.analyzeTopicalRelevance(text),
      contentFreshness: this.analyzeFreshness($),
      authorCredentials: this.analyzeAuthorship($)
    }
  }

  async analyzeAIFactors($: any, html: string) {
    return {
      // Structured data (crucial for AI)
      schemaMarkup: this.extractSchemaMarkup($),
      jsonLd: this.extractJsonLd(html),
      microdata: this.extractMicrodata($),
      
      // Content format preferences for AI
      faqStructure: this.analyzeFAQStructure($),
      tableData: this.analyzeTableStructure($),
      codeBlocks: $('pre, code').length,
      
      // Authority signals for AI
      citations: this.findCitations($),
      externalReferences: this.analyzeExternalLinks($),
      topicCluster: await this.analyzeTopicClustering($),
      
      // AI platform specific factors
      chatGPTFactors: this.analyzeChatGPTFactors($),
      claudeFactors: this.analyzeClaudeFactors($),
      perplexityFactors: this.analyzePerplexityFactors($)
    }
  }

  // Helper methods for content analysis
  calculateReadability(text: string): number {
    const sentences = text.split(/[.!?]+/).length
    const words = text.split(/\s+/).length
    const syllables = this.countSyllables(text)
    
    if (sentences === 0 || words === 0) return 0
    
    // Flesch Reading Ease
    const fleschScore = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words))
    return Math.max(0, Math.min(100, fleschScore))
  }

  countSyllables(text: string): number {
    const words = text.toLowerCase().split(/\s+/)
    let syllableCount = 0
    
    for (const word of words) {
      syllableCount += this.countWordSyllables(word)
    }
    
    return syllableCount
  }

  countWordSyllables(word: string): number {
    word = word.toLowerCase().replace(/[^a-z]/g, '')
    if (word.length <= 3) return 1
    
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, '')
    
    const matches = word.match(/[aeiouy]{1,2}/g)
    return matches ? matches.length : 1
  }

  analyzeImages($: any) {
    const images = $('img')
    const imageData = []
    
    images.each((i, img) => {
      const $img = $(img)
      imageData.push({
        src: $img.attr('src'),
        alt: $img.attr('alt'),
        width: $img.attr('width'),
        height: $img.attr('height'),
        loading: $img.attr('loading'),
        hasAlt: !!$img.attr('alt'),
        isLazyLoaded: $img.attr('loading') === 'lazy'
      })
    })
    
    return {
      total: images.length,
      withAlt: imageData.filter(img => img.hasAlt).length,
      lazyLoaded: imageData.filter(img => img.isLazyLoaded).length,
      details: imageData
    }
  }

  async analyzeResources(page: any) {
    const resources = await page.evaluate(() => {
      const entries = performance.getEntriesByType('resource')
      return entries.map(entry => ({
        name: entry.name,
        duration: entry.duration,
        size: entry.transferSize,
        type: entry.initiatorType
      }))
    })
    
    return {
      total: resources.length,
      javascript: resources.filter(r => r.type === 'script').length,
      css: resources.filter(r => r.type === 'link').length,
      images: resources.filter(r => r.type === 'img').length,
      fonts: resources.filter(r => r.type === 'font').length,
      averageSize: resources.reduce((sum, r) => sum + (r.size || 0), 0) / resources.length
    }
  }

  async analyzeSEO($: any) {
    return {
      title: $('title').text(),
      metaDescription: $('meta[name="description"]').attr('content'),
      metaKeywords: $('meta[name="keywords"]').attr('content'),
      canonical: $('link[rel="canonical"]').attr('href'),
      robots: $('meta[name="robots"]').attr('content'),
      ogTags: {
        title: $('meta[property="og:title"]').attr('content'),
        description: $('meta[property="og:description"]').attr('content'),
        image: $('meta[property="og:image"]').attr('content'),
        url: $('meta[property="og:url"]').attr('content')
      },
      twitterTags: {
        card: $('meta[name="twitter:card"]').attr('content'),
        title: $('meta[name="twitter:title"]').attr('content'),
        description: $('meta[name="twitter:description"]').attr('content')
      },
      structuredData: this.extractStructuredData($)
    }
  }

  async analyzeSecurity(url: string, page: any) {
    const securityInfo = await page.evaluate(() => {
      return {
        hasHttps: window.location.protocol === 'https:',
        hasCSP: !!document.querySelector('meta[http-equiv="Content-Security-Policy"]'),
        hasHSTS: false, // Would need to check response headers
        hasXFrameOptions: false, // Would need to check response headers
        hasReferrerPolicy: !!document.querySelector('meta[name="referrer"]')
      }
    })
    
    return {
      ...securityInfo,
      url: url,
      domain: new URL(url).hostname
    }
  }

  async analyzeTopicalRelevance(text: string) {
    // Simple keyword density analysis
    const words = text.toLowerCase().split(/\s+/)
    const wordFreq: { [key: string]: number } = {}
    
    words.forEach(word => {
      if (word.length > 3) {
        wordFreq[word] = (wordFreq[word] || 0) + 1
      }
    })
    
    const sortedWords = Object.entries(wordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
    
    return {
      topKeywords: sortedWords,
      keywordDensity: sortedWords.map(([word, count]) => ({
        word,
        count,
        density: (count / words.length) * 100
      }))
    }
  }

  analyzeFreshness($: any) {
    const dates = $('time, .date, .published, .updated').map((i, el) => $(el).text()).get()
    const lastModified = $('meta[name="last-modified"]').attr('content')
    const published = $('meta[property="article:published_time"]').attr('content')
    
    return {
      datesFound: dates.length,
      lastModified,
      published,
      isRecent: this.isContentRecent(lastModified || published)
    }
  }

  isContentRecent(dateString: string): boolean {
    if (!dateString) return false
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    return diffDays < 365 // Less than a year old
  }

  analyzeAuthorship($: any) {
    const authorSelectors = [
      '.author', '.byline', '.writer', '[rel="author"]',
      'meta[name="author"]', 'meta[property="article:author"]'
    ]
    
    const authors = []
    authorSelectors.forEach(selector => {
      const elements = $(selector)
      elements.each((i, el) => {
        const text = $(el).text() || $(el).attr('content')
        if (text) authors.push(text)
      })
    })
    
    return {
      authors: [...new Set(authors)],
      hasAuthor: authors.length > 0,
      authorCount: authors.length
    }
  }

  extractSchemaMarkup($: any) {
    const schemas = []
    $('script[type="application/ld+json"]').each((i, el) => {
      try {
        const content = $(el).html()
        if (content) {
          const schema = JSON.parse(content)
          schemas.push(schema)
        }
      } catch (e) {
        // Invalid JSON, skip
      }
    })
    
    return {
      count: schemas.length,
      types: schemas.map(s => s['@type']).filter(Boolean),
      schemas
    }
  }

  extractJsonLd(html: string) {
    const jsonLdRegex = /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs
    const matches = html.match(jsonLdRegex)
    
    if (!matches) return []
    
    return matches.map(match => {
      try {
        const content = match.replace(/<script[^>]*>/, '').replace(/<\/script>/, '')
        return JSON.parse(content)
      } catch (e) {
        return null
      }
    }).filter(Boolean)
  }

  extractMicrodata($: any) {
    const microdata = []
    $('[itemtype]').each((i, el) => {
      const $el = $(el)
      microdata.push({
        type: $el.attr('itemtype'),
        id: $el.attr('itemid'),
        properties: {}
      })
    })
    
    return microdata
  }

  analyzeFAQStructure($: any) {
    const faqs = []
    $('details, .faq, .faq-item').each((i, el) => {
      const $el = $(el)
      const question = $el.find('summary, .question, h3, h4').first().text()
      const answer = $el.find('p, .answer').text()
      
      if (question && answer) {
        faqs.push({ question, answer })
      }
    })
    
    return {
      count: faqs.length,
      items: faqs
    }
  }

  analyzeTableStructure($: any) {
    const tables = $('table')
    const tableData = []
    
    tables.each((i, table) => {
      const $table = $(table)
      const rows = $table.find('tr').length
      const columns = $table.find('tr').first().find('td, th').length
      
      tableData.push({
        rows,
        columns,
        hasHeader: $table.find('th').length > 0,
        hasCaption: $table.find('caption').length > 0
      })
    })
    
    return {
      count: tables.length,
      averageRows: tableData.reduce((sum, t) => sum + t.rows, 0) / tableData.length || 0,
      averageColumns: tableData.reduce((sum, t) => sum + t.columns, 0) / tableData.length || 0,
      tables: tableData
    }
  }

  findCitations($: any) {
    const citations = []
    
    // Look for citation patterns
    $('cite, .citation, [data-cite]').each((i, el) => {
      citations.push($(el).text())
    })
    
    // Look for numbered references
    $('ol.references, .references ol').each((i, el) => {
      $(el).find('li').each((j, li) => {
        citations.push($(li).text())
      })
    })
    
    return {
      count: citations.length,
      citations
    }
  }

  analyzeExternalLinks($: any) {
    const links = $('a[href^="http"]')
    const externalLinks = []
    
    links.each((i, link) => {
      const href = $(link).attr('href')
      if (href && !href.includes(window.location.hostname)) {
        externalLinks.push({
          url: href,
          text: $(link).text(),
          domain: new URL(href).hostname
        })
      }
    })
    
    return {
      count: externalLinks.length,
      domains: [...new Set(externalLinks.map(l => l.domain))],
      links: externalLinks
    }
  }

  async analyzeTopicClustering($: any) {
    const headings = $('h1, h2, h3, h4, h5, h6').map((i, el) => $(el).text()).get()
    const paragraphs = $('p').map((i, el) => $(el).text()).get()
    
    // Simple topic extraction from headings
    const topics = headings.map(heading => {
      const words = heading.toLowerCase().split(/\s+/)
      return words.filter(word => word.length > 3)
    }).flat()
    
    const topicFreq: { [key: string]: number } = {}
    topics.forEach(topic => {
      topicFreq[topic] = (topicFreq[topic] || 0) + 1
    })
    
    return {
      mainTopics: Object.entries(topicFreq)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([topic, count]) => ({ topic, count })),
      headingCount: headings.length,
      paragraphCount: paragraphs.length
    }
  }

  analyzeChatGPTFactors($: any) {
    return {
      // Factors that ChatGPT values
      hasStructuredData: $('script[type="application/ld+json"]').length > 0,
      hasFAQ: $('details, .faq').length > 0,
      hasCodeExamples: $('pre code, .code-example').length > 0,
      hasStepByStep: $('ol li, .step, .tutorial').length > 0,
      hasDefinitions: $('dl, .definition, .glossary').length > 0
    }
  }

  analyzeClaudeFactors($: any) {
    return {
      // Factors that Claude values
      hasCitations: $('cite, .citation').length > 0,
      hasReferences: $('.references, .bibliography').length > 0,
      hasAcademicTone: this.hasAcademicTone($),
      hasDetailedExplanations: $('p').filter((i, el) => $(el).text().length > 200).length > 0,
      hasTechnicalDepth: $('pre, code, .technical').length > 0
    }
  }

  analyzePerplexityFactors($: any) {
    return {
      // Factors that Perplexity values
      hasRecentData: this.hasRecentContent($),
      hasMultipleSources: $('a[href^="http"]').length > 5,
      hasFactualContent: $('blockquote, .quote, .fact').length > 0,
      hasDataVisualization: $('table, .chart, .graph').length > 0,
      hasExpertOpinion: $('.expert, .authority, .specialist').length > 0
    }
  }

  hasAcademicTone($: any): boolean {
    const academicWords = ['research', 'study', 'analysis', 'evidence', 'conclusion', 'methodology']
    const text = $.text().toLowerCase()
    return academicWords.some(word => text.includes(word))
  }

  hasRecentContent($: any): boolean {
    const dates = $('time, .date, .published').map((i, el) => $(el).text()).get()
    const currentYear = new Date().getFullYear()
    return dates.some(date => date.includes(currentYear.toString()))
  }

  extractStructuredData($: any) {
    const structuredData = []
    
    // Extract all structured data
    $('script[type="application/ld+json"]').each((i, el) => {
      try {
        const content = $(el).html()
        if (content) {
          const data = JSON.parse(content)
          structuredData.push(data)
        }
      } catch (e) {
        // Skip invalid JSON
      }
    })
    
    return structuredData
  }

  async extractMainContent(websiteData: WebsiteData): Promise<string> {
    // Extract main content from the crawled data
    const content = websiteData.content
    const headings = [
      ...content.headingStructure.h1,
      ...content.headingStructure.h2,
      ...content.headingStructure.h3
    ]
    
    // Create a comprehensive content summary
    const mainContent = `
      Website Content Analysis:
      
      Word Count: ${content.wordCount}
      Readability Score: ${content.readabilityScore}
      Content Length: ${content.contentLength} characters
      
      Main Headings:
      ${headings.slice(0, 5).map(h => `- ${h}`).join('\n')}
      
      Content Structure:
      - Paragraphs: ${content.paragraphCount}
      - Lists: ${content.listCount}
      - Images: ${content.imageCount}
      - Links: ${content.linkCount}
      
      Technical Factors:
      - Mobile Optimized: ${websiteData.technical.isMobileOptimized ? 'Yes' : 'No'}
      - Load Time: ${websiteData.performance.loadTime}ms
      - Status Code: ${websiteData.performance.statusCode}
      
      AI Factors:
      - Schema Markup: ${websiteData.aiFactors.schemaMarkup ? 'Present' : 'Missing'}
      - FAQ Structure: ${websiteData.aiFactors.faqStructure?.count || 0} FAQs
      - Citations: ${websiteData.aiFactors.citations?.count || 0} citations
      
      This website provides comprehensive information and services with a focus on quality content and technical optimization.
    `
    
    return mainContent
  }

  async close() {
    if (this.browser) {
      await this.browser.close()
    }
  }
} 