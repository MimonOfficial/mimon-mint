<script lang="ts">
  import { ethers } from 'ethers'
  import Connect from '@/components/Connect/index.svelte'
  import MintButton from './MintButton.svelte'
  import { isConnect, myAddressShort, mintAmount } from '@/stores'

  let mintPrice: any = 0
  function onInputCheck(e: any) {
    if (!/^([1-9]{1}|1[0-5]{1})$/.test(e.target.value)) {
      e.target.value = ''
      $mintAmount = null
    }
  }

  function getMintPrice() {
    let defaultPrice: any = ethers.utils.formatEther('60000000000000000')
    if ($mintAmount > 0) {
      mintPrice = (defaultPrice * $mintAmount).toFixed(2)
    } else {
      mintPrice = 0
    }
  }
</script>

<div class="background">
  <div class="background-opacity">
    <div class="box-wrap">
      <div class="box">
        <div class="img-side">
          <div class="img-wrap">
            <img class="mimon-img" src="/assets/mimonq.png" alt="mimonq" />
          </div>
        </div>
        <div class="info-side">
          <div class="info-wrap">
            <div class="info-title">Fulfill your desire, Mimon</div>
            <div class="info-explain">
              various attributes is a form of fantasy in which latent desires are expressed in human
              dreams. Face to face your subconscious desires.
            </div>
            <div class="my-address">My Address: {$myAddressShort}</div>
            <div class="divide-line" />
            <div class="info-sale-active">
              <div class="sale-state">
                <div class="sale-count">100% Complete</div>
                <div class="sale-count">9999/10000</div>
              </div>
              <input
                class="sale-amount"
                placeholder="1 ~ 15"
                type="text"
                disabled={!$isConnect}
                bind:value={$mintAmount}
                on:input={(e) => {
                  onInputCheck(e)
                  getMintPrice()
                }}
              />
            </div>
            <div class="divide-line" />
            <div class="info-price">
              <div class="price-title">Total</div>
              <div class="price-value"><b>{mintPrice} Eth</b> + Gas</div>
            </div>
            {#if $isConnect}
              <MintButton />
            {:else}
              <Connect />
            {/if}
            <a class="info-link" href="https://opensea.io/collection/mimon" target="_blank">
              Go to the Mimon Opensea collection
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

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
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 20px;
    color: #333333;
    line-height: 16px;
  }

  .my-address {
    font-size: 1.3rem;
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

  @media screen and (max-width: 768px) {
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
      /* justify-content: space-between; */
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
