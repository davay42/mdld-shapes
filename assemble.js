import { assemble } from '../mdld-assemble/index.js'
import { getNodePathUtils, createNodeDocumentGetter } from '../mdld-assemble/utils.js'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

const pathUtils = await getNodePathUtils()
const originalDocumentGetter = await createNodeDocumentGetter()

// Filter out Quick Start Pattern sections for ontology-only builds
function filterQuickStartSections(content) {
    const lines = content.split('\n')
    const filtered = []
    let inQuickStart = false
    let inCodeBlock = false
    let codeBlockDepth = 0

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        // Track code blocks
        if (line.trim().startsWith('~~~~~~')) {
            if (!inCodeBlock) {
                inCodeBlock = true
                codeBlockDepth++
            } else {
                codeBlockDepth--
                if (codeBlockDepth === 0) {
                    inCodeBlock = false
                }
            }
        }

        // Check for Quick Start Pattern section
        if (line.trim() === '## 📋 Quick Start Pattern') {
            inQuickStart = true
            continue
        }

        // Exit Quick Start Pattern when we hit the next major section
        if (inQuickStart && line.trim().startsWith('##') && line.trim() !== '## 📋 Quick Start Pattern') {
            inQuickStart = false
        }

        // Skip lines if we're in Quick Start Pattern
        if (inQuickStart) {
            continue
        }

        filtered.push(line)
    }

    return filtered.join('\n')
}

const configs = [
    {
        name: 'Complete catalog',
        indexFile: resolve('./index.md'),
        documentGetter: originalDocumentGetter,
        outputFile: 'shacl.md'
    },
    {
        name: 'Ontology only',
        indexFile: resolve('./index.ontology.md'),
        documentGetter: async (path) => {
            if (path.endsWith('.demo.md')) {
                throw new Error('Skipping demo file for ontology assembly')
            }
            const content = await originalDocumentGetter(path)
            return filterQuickStartSections(content)
        },
        outputFile: 'shacl-ontology.md'
    },
    {
        name: 'Demo only',
        indexFile: resolve('./index.demo.md'),
        documentGetter: async (path) => {
            if (!path.endsWith('.demo.md')) {
                throw new Error('Skipping non-demo file for demo assembly')
            }
            return originalDocumentGetter(path)
        },
        outputFile: 'shacl-demo.md'
    }
]

for (const config of configs) {
    const result = await assemble({
        indexFile: config.indexFile,
        baseDir: resolve('./'),
        documentGetter: config.documentGetter,
        pathUtils
    })

    await writeFileSync(config.outputFile, result.content)
    console.log(`✅ Assembled ${config.name} → ${config.outputFile}`)
}