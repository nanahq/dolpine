import {useState} from "react";
import {PageWrapper} from "@/components/Pagewrapper";

const DeletePage = () => {
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await fetch(`https://api.trynanaapp.com/api-gateway/v1/user/delete-request/${phone}`)
            setSuccess(success)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

     return (
        <PageWrapper location="/delete" defaultTitle="Delete Your Account">
            <section className="bg-black h-screen w-screen overflow-hidden">
                <div className="flex flex-row justify-center items-center">
                    <div className="bg-white p-3 rounded-lg w-[500px] mt-[100px]">
                        {success ? (
                            <>
                                <h1 className="font-bold text-xl mb-5 text-center">Your Request is sent</h1>
                                <p className="text-xl">We will reach out to confirm your request before processing.</p>
                            </>
                        ) : (
                            <>
                                <h1 className="font-bold text-2xl text-center">Account Removal Request</h1>
                                <div className="bg-gray-200 h-[3px] my-2 w-full" />
                                <p>Deleting your Nana account will remove all your information from our database. You will not be able to place order, view order history and access your account on Nana.  This action is permanent and can not be undone.</p>
                                <div className="flex flex-col mt-5">
                                    <div className="flex flex-col">
                                        <p className="text-gray-300 mb-2">Type in your phone number</p>
                                        <input type="tel" onChange={(event) => setPhone(event.target.value)} value={phone} placeholder="Phone Number" className=" w-full border-gray-200 border-[1px] py-3 px-3"/>
                                    </div>
                                    <button disabled={phone === '' || loading} onClick={handleSubmit} className="mt-5 rounded-lg bg-nana-blue px-3 py-2 text-white font-bold">{loading ? 'Processing' : 'Delete Account'}</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </PageWrapper>
    )
}

export default DeletePage
