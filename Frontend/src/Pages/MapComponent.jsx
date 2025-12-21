

const MapComponent = () => {

    return (

        <div className='map'>

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.548547!2d28.188056!3d-25.746111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9561f9c5c5b3f9%3A0x5017d681632a850!2sPretoria%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v1700801386224!5m2!1sen!2sza"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

        </div>
    )
}

export default MapComponent
