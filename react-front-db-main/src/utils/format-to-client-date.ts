export const formatToClientDate = (date?: Date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;
  if (!date) {
    return ""
  }
    return new Date(date).toLocaleDateString('ru-RU', options)
}
