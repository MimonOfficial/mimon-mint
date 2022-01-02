<script lang="ts">
  export let publicSale: any
  import { mintAmount } from '@/stores'
</script>

{#if $mintAmount}
  <div class="mint-button" on:click="{publicSale}">Mint</div>
{:else}
  <div class="mint-button-unactive">Mint</div>
{/if}

<style lang="scss">
  .mint-button {
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

  .mint-button:active {
    opacity: 0.6;
  }

  .mint-button-unactive {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px;
    background-color: lightgray;
    border-radius: 10px;
    font-size: 1.3rem;
    color: white;
    box-sizing: border-box;
    margin-bottom: 20px;
    font-weight: bold;
  }
</style>
