import {writable, readable} from 'svelte/store'

// blockchain
export const isConnect:any = writable(false)
export const provider:any = writable(null)
export const signer:any = writable(null)
export const myAddress:any = writable(null)
export const myAddressShort:any = writable('')
export const myBalance:any = writable(0)
export const publicPolygonRPC:any = readable('https://polygon-rpc.com/')

// mint
export const mintAmount:any = writable(null)