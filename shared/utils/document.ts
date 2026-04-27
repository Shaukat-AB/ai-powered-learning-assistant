export const documentNameValidater = {
  isValid: (name: string) => {
    return name && /^(?!-)(?!.*--)[a-z0-9-]{1,26}(?<!-)$/.test(name); // lowercase separated by - and length at most 26
  },

  validate: (name: unknown) =>
    typeof name === 'string'
      ? name
          .toLowerCase()
          .replace(/\W+|_+/g, '-') // replace all non word characters including _ with -
          .replace(/^-+|-+$/g, '') // replace - at the start or end
      : '',
};
