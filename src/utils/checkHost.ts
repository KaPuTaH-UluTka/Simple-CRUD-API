export const checkHost = (host: string) => {
  const portIndex = host.indexOf(':');

  if (portIndex > -1) return host.slice(0, portIndex);

  return host;
};
