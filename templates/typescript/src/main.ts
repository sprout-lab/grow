'use strict';

export const greeting = (): string => 'Hello <%= it.projectName %>!'

export async function main(): Promise<void> {
  console.log(greeting())
}

// Run if this is the entry point module
if (import.meta.url === `file://${process.argv[1]}`) {
  await main().catch(err => {
    console.error(err)
    process.exit(1)
  })
}