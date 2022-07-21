export const getServerSideProps  = async ({ res }) => {
  if (res) {
    const data = {
      "capabilities": {
        "api-documentation": "https://github.com/heartmail/heartmail/heartmail-docs/0000.md"
      }
    }

    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(data))
    res.end()
  }
  return {
    props: {},
  }
}

export default () => {}
