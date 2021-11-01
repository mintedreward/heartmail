/* global describe,it */
'use strict'
import { MerkleProof } from '../src/merkle-proof.mjs'
import should from 'should'

describe('MerkleProof', function () {
  it('should satisfy this basic API', function () {
    const merkleProof = new MerkleProof()
    should.exist(merkleProof)
  })

  describe('@fromBuffer', () => {
    it('should deserialize and serialize this test vector', () => {
      const merkleProofHex = '000cef65a4611570303539143dabd6aa64dbd0f41ed89074406dc0e7cd251cf1efff69f17b44cfe9c2a23285168fe05084e1254daa5305311ed8cd95b19ea6b0ed7505008e66d81026ddb2dae0bd88082632790fc6921b299ca798088bef5325a607efb9004d104f378654a25e35dbd6a539505a1e3ddbba7f92420414387bb5b12fc1c10f00472581a20a043cee55edee1c65dd6677e09903f22992062d8fd4b8d55de7b060006fcc978b3f999a3dbb85a6ae55edc06dd9a30855a030b450206c3646dadbd8c000423ab0273c2572880cdc0030034c72ec300ec9dd7bbc7d3f948a9d41b3621e39'
      const merkleProof = MerkleProof.fromHex(merkleProofHex)
      merkleProof.toHex().should.equal(merkleProofHex)
    })
  })
})
