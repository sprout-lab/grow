'use strict';

export const greeting = () => 'Hello <%= it.projectName %>!';

export async function main() {
  console.log(greeting());
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
