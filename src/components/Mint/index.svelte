<script lang="ts">
  import { ethers } from 'ethers'
  import { Diamonds } from 'svelte-loading-spinners'
  import Connect from '@/components/Connect/index.svelte'
  import MintButton from './MintButton.svelte'
  import {
    isConnect,
    myAddressShort,
    mintAmount,
    signer,
    MimonSaleContract,
    ethereumRPC,
    MimonContract,
  } from '@/stores'

  const ethereumProvider = new ethers.providers.JsonRpcProvider($ethereumRPC)
  const mimonContract = new ethers.Contract($MimonContract, MimonABI, ethereumProvider)
  import MimonSaleABI from '@/data/abi/MimonSale.json'
  import MimonABI from '@/data/abi/Mimon.json'
  import { onMount } from 'svelte'

  const PUBLICSALE_PRICE: any = ethers.utils.formatEther('60000000000000000')

  let mintPrice: any = 0
  let mimonTotalSupply: any = 0
  let mimonTotalPercent: any = 0
  let spinnerState = false
  let defaultImg = '/assets/mimonq.png'

  onMount(() => {
    calcMimonTotalSupply()
  })

  function onInputCheck(e: any) {
    if (!/^([1-9]{1}|1[0-5]{1})$/.test(e.target.value)) {
      e.target.value = ''
      $mintAmount = null
    }
  }

  async function publicSale() {
    const mimonSaleContract = new ethers.Contract($MimonSaleContract, MimonSaleABI, $signer)
    let isPublicSale = await mimonSaleContract.isPublicSale()
    let overrides = {
      value: ethers.utils.parseEther(mintPrice),
    }
    const transaction = await mimonSaleContract
      .publicSale($mintAmount, overrides)
      .catch((data: any) => {
        if (isPublicSale === false) {
          alert('The public-sale has not started yet.')
          setSpinner()
          return
        }
        if (data.code === 4001) {
          alert('The transaction has been canceled.')
          setSpinner()
          return
        }
        if (data.code === 'INSUFFICIENT_FUNDS') {
          alert(`You don't have enough Ether in your wallet.`)
          setSpinner()
          return
        }
      })
    setSpinner()
    await transaction.wait()
    $mintAmount = null
    getPublicSalePrice()
    calcMimonTotalSupply()
    setSpinner()
  }

  // async function mintedImg() {
  //   const apiData = await axios.get(`https://api.mimons.io/mimon/${1}`)
  //   console.log(apiData.data.image)
  //   defaultImg = apiData.data.image
  // }

  function getPublicSalePrice() {
    if ($mintAmount > 0) {
      mintPrice = (PUBLICSALE_PRICE * $mintAmount).toFixed(2)
    } else {
      mintPrice = 0
    }
  }

  async function calcMimonTotalSupply() {
    mimonTotalSupply = await mimonContract.totalSupply()
    mimonTotalPercent = ((mimonTotalSupply / 10000) * 100).toFixed(1)
  }

  function setSpinner() {
    spinnerState = !spinnerState
  }
</script>

<div class="background">
  <div class="background-opacity">
    <div class="box-wrap">
      <div class="box">
        <div class="info">Coming Soon!</div>
      </div>
      <!-- <div class="box">
        <div class="img-side">
          <div class="img-wrap">
            <img class="mimon-img" src={defaultImg} alt="mimonq" />
          </div>
        </div>
        <div class="info-side">
          <div class="info-wrap">
            <div class="info-title">Fulfill your desire, Mimon</div>
            <div class="info-explain">
              Pre sale : 0.04 ETH Maximum mint quantity : 3 Mimons
              <br />
              Public sale : 0.06 ETH Maximum mint quantity : 15 Mimons
            </div>
            <div class="my-address">My Address: {$myAddressShort}</div>
            <div class="divide-line" />
            <div class="info-sale-active">
              <div class="sale-state">
                <div class="sale-count">{mimonTotalPercent}% Complete</div>
                <div class="sale-count">{mimonTotalSupply}/10000</div>
              </div>
              <input
                class="sale-amount"
                placeholder="1 ~ 15"
                type="text"
                disabled={!$isConnect}
                bind:value={$mintAmount}
                on:input={(e) => {
                  onInputCheck(e)
                  getPublicSalePrice()
                }}
              />
            </div>
            <div class="divide-line" />
            <div class="info-price">
              <div class="price-title">Total</div>
              <div class="price-value"><b>{mintPrice} Eth</b> + Gas</div>
            </div>
            {#if $isConnect}
              <MintButton {publicSale} />
            {:else}
              <Connect />
            {/if}
            <a class="info-link" href="https://opensea.io/collection/mimon" target="_blank">
              Go to the Mimon Opensea collection
            </a>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</div>
{#if spinnerState}
  <div class="spiner">
    <Diamonds size="60" color="#f096a7" unit="px" duration="1s" />
  </div>
{/if}

<style lang="scss">
  .background {
    background-image: url('/assets/mainimg.jpg');
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .background-opacity {
    background: rgba(0, 0, 0, 0.6);
    height: 100vh;
  }

  .box-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .box {
    width: 70%;
    height: 70%;
    background-color: #fff6f8;
    border: 3px solid #211919;
    box-sizing: border-box;
    box-shadow: 15px 15px 20px 5px rgba(0, 0, 0, 0.25);
    padding: 50px;
    display: flex;
    overflow: scroll;
    justify-content: space-between;
    align-items: center;
  }

  .img-side {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info-side {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .img-wrap {
    background-color: #f096a7;
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: center;
    padding: 15px;
    border-radius: 15px;
  }

  .mimon-img {
    width: 100%;
  }

  .info-wrap {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .info-title {
    font-size: 1.6rem;
    text-align: center;
    margin-bottom: 10px;
  }

  .info-explain {
    font-size: 0.8rem;
    text-align: center;
    margin-bottom: 20px;
    color: #333333;
    line-height: 16px;
  }

  .my-address {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .info-sale-active {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .sale-count {
      font-size: 0.9rem;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .sale-amount {
      width: 50%;
      background-color: #f096a7;
      padding: 8px;
      border-radius: 10px;
      box-sizing: border-box;
      color: white;
      font-weight: bold;
    }
  }

  .divide-line {
    background-color: #f096a7;
    width: 100%;
    height: 2px;
    margin-bottom: 10px;
  }

  .info-price {
    display: flex;
    font-size: 1.1rem;
    margin-bottom: 20px;
    .price-title {
      width: 30%;
      font-style: italic;
    }
    .price-value {
      width: 70%;
      text-align: end;
      color: #f096a7;
    }
  }

  .info-link {
    width: 100%;
    color: #f096a7;
    font-size: 0.8rem;
    text-align: center;
  }

  .spiner {
    z-index: 100;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100vh;
  }

  .info {
    font-weight: bold;
    font-size: 4rem;
    color: #f096a7;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;
  }

  @media screen and (max-width: 768px) {
    .info {
      font-weight: bold;
      font-size: 2.5rem;
      color: #f096a7;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 80vh;
    }
    .box {
      width: 80%;
      height: auto;
      background-color: #fff6f8;
      border: 3px solid #211919;
      box-sizing: border-box;
      box-shadow: 15px 15px 20px 5px rgba(0, 0, 0, 0.25);
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: scroll;
    }
    .img-side {
      width: 80%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .info-side {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
