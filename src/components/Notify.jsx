export const Notify = ({errorMessage}) => {
    if(!errorMessage){
        return null // Si no hay errorMessage, devolvemos NULL
    }
 
    return (
        <div style={{ color: 'green', position: 'fixed', top: 0, width: '100%' }}>
             {errorMessage}
        </div>
    )

}