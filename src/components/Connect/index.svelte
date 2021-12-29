<script lang="ts">
  import { ethers } from 'ethers'
  import { onDestroy } from 'svelte'
  import {
    isConnect,
    myAddress,
    myAddressShort,
    signer,
    provider,
    myBalance,
    MimonSaleContract,
    isWhitelist,
    isPreSaleCount,
  } from '@/stores'
  const ethereum: any | undefined = (window as any).ethereum
  import MimonSaleABI from '@/data/abi/MimonSale.json'

  onDestroy(() => {
    if ($isConnect === true) {
      getInfo()
    }
  })

  async function connect() {
    if (ethereum === undefined) {
      alert('There is no Metamask. Please install Metamask.')
      return false
    }
    await addChain()
    requestAccount()
    changed()
  }

  async function addChain() {
    // await ethereum.request({
    //   method: 'wallet_addEthereumChain',
    //   params: [
    //     {
    //       chainId: '0x4bd',
    //       chainName: 'Popcateum',
    //       nativeCurrency: {
    //         name: 'Popcat',
    //         symbol: 'POP',
    //         decimals: 18,
    //       },
    //       rpcUrls: ['https://dataseed.popcateum.org'],
    //       blockExplorerUrls: ['https://explorer.popcateum.org'],
    //     },
    //   ],
    // })
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }],
    })
  }

  async function getInfo() {
    $provider = new ethers.providers.Web3Provider(ethereum)
    $signer = $provider.getSigner()
    await getAddress()
    await getBalance()
    await getIsWhitelist()
  }

  function changed() {
    ethereum.on('accountsChanged', async () => {
      await getAddress()
      await getBalance()
      await getIsWhitelist()
    })
  }

  async function requestAccount() {
    await ethereum.request({ method: 'eth_requestAccounts' })
    $isConnect = true
  }

  async function getAddress() {
    $myAddress = await $signer.getAddress()
    $myAddressShort = `${$myAddress.slice(0, 6)}...${$myAddress.slice(-4)}`
  }

  async function getBalance() {
    $myBalance = ethers.utils.formatEther(await $provider.getBalance($myAddress))
  }

  async function getIsWhitelist() {
    const mimonSaleContract = new ethers.Contract($MimonSaleContract, MimonSaleABI, $signer)
    $isPreSaleCount = 3 - (await mimonSaleContract.preSaleCount($myAddress))
    $isWhitelist = await mimonSaleContract.whitelist($myAddress)
  }
</script>

<div class="connect-button" on:click={connect}>Wallet Connect</div>

<style lang="scss">
  .connect-button {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px;
    background-color: #f096a7;
    border-radius: 10px;
    font-size: 1.3rem;
    color: white;
    box-sizing: border-box;
    margin-bottom: 20px;
    font-weight: bold;
    cursor: pointer;
  }

  .connect-button:active {
    opacity: 0.6;
  }
</style>
