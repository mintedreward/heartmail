export const getServerSideProps  = async ({ res }) => {
  if (res) {
    const data = {
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
