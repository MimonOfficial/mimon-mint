import {writable, readable} from 'svelte/store'

// blockchain
export const isConnect:any = writable(false)
export const provider:any = writable(null)
export const signer:any = writable(null)
export const myAddress:any = writable(null)
export const myAddressShort:any = writable('')
export const myBalance:any = writable(0)
export const ethereumRPC: any = readable('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')

// Mimon NFT Contract
export const MimonContract: any = readable('0x7fb4a2249fd66510c1d77B99454cd6B968DaF5F7')

// Sale Contract
export const MimonSaleContract: any = readable('0x7CFf12B23C868ae4b38CCe68B1a2c5DAe7eDB94b')
export const mintAmount:any = writable(null)
export const isWhitelist: any = writable(null)
export const isPreSaleCount: any = writable(false)