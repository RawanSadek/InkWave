export const REQUIRED_FIELD = (field_name:string) => ({
    required: `${field_name} is required!` 
})

export const URL_VALIDATION = {
    required: `Image URL is required!` ,
    // pattern: {
    //     value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i,
    //     message: "Please enter a valid URL!"
    // }
}