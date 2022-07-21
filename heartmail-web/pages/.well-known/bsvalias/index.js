export const getServerSideProps  = async ({ res }) => {
  if (res) {
    const data = {
      "capabilities": {
        "api-documentation": "https://github.com/heartmail/heartmail/blob/master/heartmail-docs/index.md"
      }
    }

    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(data, undefined, 2))
    res.end()
  }
  return {
    props: {},
  }
}

export default () => {}
