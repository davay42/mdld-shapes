import { consolidate } from '../mdld-consolidate/index.js'

consolidate({
    indexFile: './index.md',
    outputFile: './shacl.md'
}).catch(console.error)
