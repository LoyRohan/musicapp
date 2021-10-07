class Localstoreage {
    setItem = (key, value) => {
        console.log(value,'___________________value')
        try {
            let data = JSON.stringify(value);
            localStorage.setItem(key, data);
        }
        catch(err) {
            return false;
        }
    };

    getItem = (key, value) => {
        try{
            let value = localStorage.getItem(key);
            
            if (value) {
                return JSON.parse(value);
            }
            return false;
        }
        catch(err) {

        }
    };

    removeItem = (key) => {
        try {
            localStorage.removeItem(key);
        }
        catch(err) {
            return false;
        }
    };

    removeItemIndex = (key, index) => {
        try {
            let value = localStorage.getItem(key);
            if (value) {
                value = JSON.parse(value);
                value.splice(index, 1);
                localStorage.setItem(key, JSON.stringify(value));
                return value;
            }
            return false;
        }
        catch(err) {
            return false;
        }
    };

    clearAll = () => {
        try {
            localStorage.clear()
        }
        catch(error) {
            return false;
        }
    }

};

export default Localstoreage;