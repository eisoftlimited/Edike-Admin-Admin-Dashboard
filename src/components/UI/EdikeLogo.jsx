import edikeLogo from './../../img/edike-logo.svg';

function EdikeLogo ({className}) {
    return (
        <img src={edikeLogo} alt='Edike Logo' className={className} />
    );
}

export default EdikeLogo;