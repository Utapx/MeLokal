export function resolve(specifier, context, nextResolve) {
  if (/\.(jpg|jpeg|png|webp)$/i.test(specifier)) {
    return {
      url: new URL(specifier, context.parentURL).href,
      shortCircuit: true,
    }
  }
  return nextResolve(specifier, context)
}

export function load(url, context, nextLoad) {
  if (/\.(jpg|jpeg|png|webp)$/i.test(url)) {
    return {
      format: 'module',
      source: `export default ${JSON.stringify(url)}`,
      shortCircuit: true,
    }
  }
  return nextLoad(url, context)
}
