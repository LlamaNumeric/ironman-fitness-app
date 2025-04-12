import React, { useEffect, useState, type JSX } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";


type header = {
    [key: string] : {
        column : string;
        content : Onner | Twonner
    }
}

type Onner = {
    [key:string] : string | string[]
}

type Twonner = {
    [key: string] : {
        [key: string] : string | string[]}
}

let masterSettings: header = {
	general: {
        column: "two",
        content : {
            name: { type: "text", value: "user" },
            birthday: { type: "date", value: "2000-06-15" },
        }
	},
	workout: {
        column: "two",
        content: {
            intensity: {
                type: "select",
                options: ["Easy", "Medium", "Hard"],
                value: "Easy",
            },
            biological_sex: {
                type: "select",
                options: ["Male", "Female"],
                value: "Male",
            }
        }

	},
    units : {
        column : "two",
        content : {

        }
    },
    lang : {
        column: "one",
        content : {
            options : ["中文", "English", "हिंदी", "Español", "Français", "العربية", "বাংলা", "Русский", "Português", "اُردُو"],
            value : "English"
        }
    },
};

let inputType: { [key: string]: Function } = {
	text: ([key, data] : [key : string, data : {[key:string] : any}]) => <input id={key} type='text' defaultValue={data.value} />,
	date: ([key, data] : [key : string, data : {[key:string] : any}]) => <input id={key} type='date' defaultValue={data.value} />,
	number: ([key, data] : [key : string, data : {[key:string] : any}]) => <input id={key} type='number' defaultValue={data.value} />,
	select: ([key, data] : [key : string, data : {[key:string] : any}]) => (
		<select id={key} defaultValue={data.value}>
			{data.options.map((e : string, i : number) => (
				<option key={i} value={e}>
					{e}
				</option>
			))}
		</select>
	),
	novalue: () => <p>Page does not exist</p>,
};

function buildTable(settings : {column : string; content : {[key: string] : any} }) {
	const titleCase = (text: string) => {
        let temp = text.split("_")
        temp = temp.map(e => e[0].toUpperCase()+e.substring(1));
        return temp.join(" ");
    }
    const {column, content} : {column : string, content: any} = settings;


    const actions : {[key: string] : Function} = {
        one : () => {
            const {options, value} : {options : string[], value : string} = content;
            return options.map((e: string, i : number) => <div key={i} className="p-2 cursor-pointer hover:bg-lime-50">{e}</div>)
        },
        two : () => {
            const filtered : {[key:string] : {[key:string] : any}} = content;
            return Object.entries(filtered).map(([k, v], i) => <div key={i} className="p-2 grid grid-cols-2"><label htmlFor={k} className="text-center">{titleCase(k)}</label>{inputType[v.type]([k, v])}</div>)
        }
    }
    
    return <div className="divide-y-1 divide-slate-300">{actions[column]()}</div>
}

function Settings() {
	const [settings, setSettings] = useState({column : "two", content : {}});
	const { id = "" } = useParams();
    let [pageName, setPageName] = useState("pageName")


	useEffect(() => {
        let [ind, name] = id.split('-');
        setPageName(name);
		let chosen : {column: string; content: any} = masterSettings[ind] ?? null;
		setSettings(chosen);
	}, []);

	return (
        <>
            <div className="md:text-left md:text-2xl p-2 bg-slate-50 "><Link to="/profile" className="m-4">◀</Link><span>{pageName}</span></div>
            <form className='h-[100%] pt-5 divide-y-3 divide-slate-100'>
                {settings ? (
                        buildTable({...settings})
                    ) : (
                        <div className="flex flex-col h-[100%] justify-center">
                            <p className='p-2 text-2xl text-center my-auto'>
                                Page does not exist
                            </p>
                        </div>
                    )}
            </form>
        </>
	);
}

export default Settings;
