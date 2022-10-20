export const getQuotes = async ({ setQuotes, setLoading }: any) => {
  try {
    const response = await fetch('https://type.fit/api/quotes')
    setQuotes(await response.json())
    setLoading(false)
  } catch (error) {
    console.log(error)
  }
}
