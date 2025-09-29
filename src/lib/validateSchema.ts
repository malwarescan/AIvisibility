import Ajv from 'ajv'
const ajv = new Ajv({ allErrors: true, strict: false })

export function validateSchema(json: any): { valid: boolean, errors?: any[] } {
  try {
    // Quick check for required JSON-LD properties
    if (!json['@context'] || !json['@type']) {
      return {
        valid: false,
        errors: [
          { message: 'Missing required @context or @type' }
        ]
      }
    }

    // Optional: define or load a schema.org JSON Schema (advanced)
    // const schema = schemaByType(json['@type'])
    // const validate = ajv.compile(schema)
    // const isValid = validate(json)

    // For now, treat any well-formed object with @context/@type as valid
    return { valid: true }
  } catch (e: any) {
    return { valid: false, errors: [{ message: e.message }] }
  }
} 