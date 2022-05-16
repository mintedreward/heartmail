export const getServerSideProps  = async ({ res }) => {
  if (res) {
    const data = {
      "bsvalias": "1.0",
      "capabilities": {
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
