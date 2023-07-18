const getParam = (query: string): string => {
  const url = new URL(window.location.href);
  const paramCity = url.searchParams.get(query);

  return paramCity ?? "New York";
};

export default getParam;
