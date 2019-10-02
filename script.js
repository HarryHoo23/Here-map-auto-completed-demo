(function () {
    document.getElementById("autocomplete-input").addEventListener('keyup', (ele) => {
        debounce(remoteCall,300)(ele.target.value);
    })

    async function remoteCall(input) {
        document.getElementById('dropdown-content').innerHTML = '';
        var response = await fetch(`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=NJGYhnLuMRnFuyH22Hpj&app_code=CE0bEptPZiWwNOeCTemcfQ&query=${input}&beginHighlight=<b>&endHighlight=</b>&country=AUs&maxresults=5`);
        const responseJson = await response.json();
        if (!responseJson.suggestions) {
            return;
        }
        responseJson.suggestions.forEach(item => {
            document.getElementById('dropdown-content').insertAdjacentHTML('beforeend', `
            <a href="#" class="dropdown-item">                                
            ${item.label}
            </a>`);
        });
    }
    var inThrottle;
    const throttle = (func, limit) => {
        return function () {
            const args = arguments
            const context = this
            if (!inThrottle) {
                func.apply(context, args)
                inThrottle = true
                setTimeout(() => inThrottle = false, limit)
            }
        }
    }

    var inDebounce;
    const debounce = (func, delay) => {
        return function () {
            const context = this
            const args = arguments
            clearTimeout(inDebounce)
            inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
    }


}());