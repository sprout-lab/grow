export const greeting = async (): Promise<string> => {
  return new Promise((resolve) => {
    resolve('Hello <%= it.projectName %>!');
  });
};

export async function main(): Promise<void> {
  console.log(await greeting());
}

const isDirectExecution = import.meta.url === `file://${process.argv[1] ?? ''}`;
if (isDirectExecution) {
  try {
    await main();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.stack ?? err.message);
    } else {
      console.error('Unknown error:', err);
    }
    process.exit(1);
  }
}
