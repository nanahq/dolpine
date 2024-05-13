import { UserHomePage, VendorWithListing, VendorUserI} from "@nanahq/sticky";
import axios from 'axios'
export async function getAllVendors (): Promise<VendorUserI[]> {
    try {
        const {data} = await axios<UserHomePage>('https://api.trynanaapp.com/api-gateway/v1/webapp/listings')
        return data.allVendors
    } catch (error) {
        console.log(error)
        throw new Error('Something when wrong')
    }
}
