const showFormattedDate = (date, locale) => {
  const browserLocale = locale === 'id' ? 'id-ID' : 'en-US';

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(browserLocale, options);
};

export { showFormattedDate };
