export default function generateDate() {
    const today = new Date()
        , dd = String(today.getDate()).padStart(2, '0')
        , mm = String(today.getMonth() + 1).padStart(2, '0')
        , yyyy = today.getFullYear()
        , todayString = dd + '-' + mm + '-' + yyyy;
    return todayString
}