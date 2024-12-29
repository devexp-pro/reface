/**
 * Finds the first available port starting from the given port number
 */
export async function findAvailablePort(startPort: number): Promise<number> {
  let port = startPort;

  while (port < 65536) {
    try {
      const listener = await Deno.listen({ port });
      listener.close();
      return port;
    } catch {
      port++;
    }
  }

  throw new Error("No available ports found");
}
