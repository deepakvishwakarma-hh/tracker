//how to make react component in typescript?
import { FC, useState } from "react";

interface IProps {
    isLists: boolean;
    lists: { text: '' }[];
    show: boolean;
}

const MyComponent: FC<IProps> = ({ isLists, lists, show }) => {
    let listeOuNon = 0;
    const [trad, ajoutTrad] = useState('');

    useEffect(() => {
        if (isLists) {

            (async () => {

                axios.get("/api/trad").then((reponse) => {
                    if (reponse.status == 200) {
                        ajoutTrad(reponse.data);
                    }
                });
            })();
        }
    }, [isLists]);

    if (!show) {
        return null;
    }

    return (
        <div>
        {
            isLists?(
                <div>
        <div>le super titre { trad } </div>
            < div >
            <ul>
            {
                listes.map((elements: any) => (
                    <li>{ elements.text } < /li>
                ))
            }
            < /ul>
            < /div>
            < /div>
            ) : (
    <div>
    <div>le super titre < /div>
        < div > Bonjour tout le monde < /div>
            < /div>
            )}
</div>
    );
};

export default MyComponent;



