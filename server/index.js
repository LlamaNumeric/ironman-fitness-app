import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, NavLink, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { createElement, useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function BottomNavBar() {
  const selectedItemClass = (isActive) => {
    const base = "text-center text-[28px] block";
    return base.concat(isActive ? " bg-blue-300" : "");
  };
  return /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ul", { className: "grid grid-cols-5 border-t-3 divide-x-3", children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, { className: ({ isActive }) => selectedItemClass(isActive), to: "/", children: "🏠" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, { className: ({ isActive }) => selectedItemClass(isActive), to: "/community", children: "👪" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, { className: ({ isActive }) => selectedItemClass(isActive), to: "/workout", children: "🏋️‍♀️" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, { className: ({ isActive }) => selectedItemClass(isActive), to: "/explore", children: "🧭" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, { className: ({ isActive }) => selectedItemClass(isActive), to: "/profile", children: "🙍‍♂️" }) })
  ] }) });
}
function meta$2({}) {
  return [{
    title: "Ironman"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("div", {
    className: "h-screen flex flex-col justify-stretch",
    children: [/* @__PURE__ */ jsx("div", {
      className: "grow overflow-y-auto",
      children: /* @__PURE__ */ jsx(Outlet, {})
    }), /* @__PURE__ */ jsx(BottomNavBar, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const buttonStyling = ({ children }) => {
  const classname = [];
  classname.push(React.Children.count(children) > 0 ? "flex gap-[5px]" : "");
  classname.push("mt-2 text-sm md:text-lg");
  classname.push("[&>a]:bg-emerald-200 [&>a]:rounded-md [&>a]:p-1 [&>a]:text-center [&>a]:min-w-[20%] [&>a]:flex [&>a]:flex-col [&>a]:justify-center");
  return classname.join(" ");
};
function ButtonGroup(props) {
  return /* @__PURE__ */ jsxs("div", { className: "p-2 sm:mx-auto sm:w-[80%] bg-lime-100 rounded-md space-y-4 ", children: [
    /* @__PURE__ */ jsx("h1", { className: "m-0 border-b border-slate-400", children: props.title }),
    /* @__PURE__ */ jsx("div", { className: buttonStyling(props), children: props.children || /* @__PURE__ */ jsx("p", { className: "m-1 text-center text-neutral-500 block", children: "This button group is empty" }) })
  ] });
}
function CardPost({ content }) {
  const { title, author, publishDate, image, caption, altText } = content;
  return /* @__PURE__ */ jsxs("div", { className: "h-[220px] flex flex-col border-2 border-neutral-300 rounded-md", children: [
    /* @__PURE__ */ jsx("div", { className: "p-2 h-[65%] bg-neutral-300 overflow-hidden", children: /* @__PURE__ */ jsx("img", { className: "mx-auto rounded-lg ", src: image, alt: altText, width: "180px", height: "180px" }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-2 grow bg-neutral-50", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: title }),
      /* @__PURE__ */ jsxs("span", { className: "text-sm text-neutral-600", children: [
        "by ",
        (author == null ? void 0 : author.length) ? author : "author",
        " | ",
        (publishDate == null ? void 0 : publishDate.length) ? publishDate : ""
      ] }),
      /* @__PURE__ */ jsx("p", { className: "", children: caption })
    ] })
  ] });
}
const posts = [{
  title: "Top 10 Songs to Put On When Exercising",
  author: "GlowUpGal",
  publishDate: "Jun 17, 1982",
  image: "/images/Gym Man.jpg",
  altText: "man running on treadmill",
  caption: "Third one is my go-to song!"
}, {
  title: "Eating Disorders",
  author: "NNC_Official",
  publishDate: "Mar 14, 2002",
  image: "/images/vulture-child.jpg",
  altText: "vulture waiting for malnourished child to perish",
  caption: "Understanding eating disorders—breaking the stigma and promoting recovery"
}, {
  title: "Malnutrition",
  author: "NNC_Official",
  publishDate: "Dec 25, 2015",
  image: "/images/Malnutrition.jpg",
  altText: "a poster about malnutrition",
  caption: "Are you at risk? Find out the hidden dangers of malnutrition before it's too late!"
}, {
  title: "Guides to Fruits",
  author: "NNC_Official",
  publishDate: "Feb 29, 2021",
  image: "/images/a fruit basket.jpg",
  altText: "a fruit basket",
  caption: "Boost your health instantly—discover the secret powers of these super fruits!"
}];
const buttonStyle = "p-1 border-1 border-slate-400 rounded-md";
function Index() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h1", {
      className: "py-3 px-2 border-b-4 border-gray-300 bg-slate-50 text-lg font-bold",
      children: "Ironman: Your Fitness Companion App"
    }), /* @__PURE__ */ jsx("h2", {
      className: "m-2 text-2xl font-bold text-slate-800",
      children: "Popular Topics"
    }), /* @__PURE__ */ jsxs("div", {
      className: "px-2 flex flex-col space-y-4",
      children: [/* @__PURE__ */ jsx(ButtonGroup, {
        title: "Nutrition & Diet 🍎",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/eNutrition",
          children: "eNutrition"
        })
      }), /* @__PURE__ */ jsx(ButtonGroup, {
        title: "Fitness 🏋️‍♀️",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/eNutrition",
          children: "Fitness for Beginners"
        })
      }), /* @__PURE__ */ jsxs(ButtonGroup, {
        title: "Sports and Recreation 🎾",
        children: [/* @__PURE__ */ jsx(Link, {
          to: "/eNutrition",
          children: "Traditional Filipino Sports"
        }), /* @__PURE__ */ jsx(Link, {
          to: "/eNutrition",
          children: "All things Basketball"
        }), /* @__PURE__ */ jsx(Link, {
          to: "/eNutrition",
          children: "Volleyball"
        })]
      }), /* @__PURE__ */ jsx(ButtonGroup, {
        title: "Trending 🔥"
      })]
    }), /* @__PURE__ */ jsx("h1", {
      className: "m-2 text-2xl font-bold text-slate-800",
      children: "Posts"
    }), /* @__PURE__ */ jsxs("div", {
      className: "m-2",
      children: [/* @__PURE__ */ jsx("span", {
        children: "Sort by : "
      }), /* @__PURE__ */ jsxs("div", {
        className: "inline-grid grid grid-cols-3 gap-5",
        children: [/* @__PURE__ */ jsx("button", {
          className: buttonStyle,
          children: "New"
        }), /* @__PURE__ */ jsx("button", {
          className: buttonStyle,
          children: "Trending"
        }), /* @__PURE__ */ jsx("button", {
          className: buttonStyle,
          children: "Best"
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "px-2 mb-4 space-y-6",
      children: posts.map((p, i) => /* @__PURE__ */ jsx(CardPost, {
        content: p
      }, i))
    })]
  });
}
const index = withComponentProps(Index);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
function Card({ title, targetAddress }) {
  return /* @__PURE__ */ jsx("div", { className: "\r\n            bg-slate-50 rounded-md overflow-hidden\r\n            min-w-[103px] max-w-[103px] min-h-[180px] max-h-[180] md:min-w-[180px] md:max-w-[180px] md:min-h-[240px] md:max-h-[240px]\r\n            ", children: /* @__PURE__ */ jsxs(Link, { className: "h-[100%] flex flex-col", to: targetAddress || ".", target: "_blank", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-lime-200 grow", children: "Image" }),
    /* @__PURE__ */ jsxs("span", { className: "text-center text-wrap", children: [
      title || "Card Title",
      " "
    ] })
  ] }) });
}
function CardList({ title, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "m-2 p-2 bg-lime-100 rounded-md md:max-w-[80%] md:mx-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "p-1 text-lg border-b-3 border-slate-400", children: title }),
    /* @__PURE__ */ jsx("div", { className: "p-2 flex space-x-4 overflow-auto", children: children || "No car0ds available" })
  ] });
}
function Community() {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h1", {
      className: "py-3 px-2 border-b-4 border-gray-300 bg-slate-50 text-lg font-bold",
      children: "Find your Community"
    }), /* @__PURE__ */ jsxs(CardList, {
      title: "Government",
      children: [/* @__PURE__ */ jsx(Card, {}), /* @__PURE__ */ jsx(Card, {}), /* @__PURE__ */ jsx(Card, {}), /* @__PURE__ */ jsx(Card, {}), /* @__PURE__ */ jsx(Card, {})]
    }), /* @__PURE__ */ jsxs(CardList, {
      title: "Facebook Groups",
      children: [/* @__PURE__ */ jsx(Card, {
        title: "NNC",
        targetAddress: "https://www.facebook.com/nncofficial/"
      }), /* @__PURE__ */ jsx(Card, {})]
    }), /* @__PURE__ */ jsxs(CardList, {
      title: "Local Fitness Clubs",
      children: [/* @__PURE__ */ jsx(Card, {}), /* @__PURE__ */ jsx(Card, {}), /* @__PURE__ */ jsx(Card, {}), /* @__PURE__ */ jsx(Card, {}), /* @__PURE__ */ jsx(Card, {})]
    })]
  });
}
const community = withComponentProps(Community);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: community
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "Ironman"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
function Workout() {
  const [activeTab, setActiveTab] = useState("Workout");
  const layout = {
    Workout: () => {
      return /* @__PURE__ */ jsxs("div", {
        className: "mx-2 p-2",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-center",
          children: "You don't have an active fitness routine"
        }), /* @__PURE__ */ jsx("div", {
          className: "flex justify-center",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/generator",
            className: "p-2 rounded-lg border",
            children: "Generate a routine"
          })
        })]
      });
    },
    Diet: () => {
      return /* @__PURE__ */ jsxs("div", {
        className: "mx-2 p-2",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-center",
          children: "You don't have an active diet plan"
        }), /* @__PURE__ */ jsx("div", {
          className: "flex justify-center",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/planner",
            className: "p-2 rounded-lg border",
            children: "Plan a diet"
          })
        })]
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h1", {
      className: "py-3 px-2 border-b-4 border-gray-300 bg-slate-50 text-lg font-bold",
      children: "Fitness"
    }), /* @__PURE__ */ jsx("div", {
      className: "m-2 flex justify-center",
      children: /* @__PURE__ */ jsxs("span", {
        className: "p-2 flex justify-center gap-4 bg-neutral-50 rounded-xl [&>button]:rounded-full [&>button]:w-[100px] [&>button]:p-2 [&>button]:transition [&>button]:duration-250",
        children: [/* @__PURE__ */ jsx("button", {
          onClick: () => setActiveTab("Workout"),
          className: activeTab === "Workout" ? "bg-green-200" : "bg-green-100 hover:bg-green-300",
          children: "Workout"
        }), /* @__PURE__ */ jsx("button", {
          onClick: () => setActiveTab("Diet"),
          className: activeTab === "Diet" ? "bg-green-200" : "bg-green-100 hover:bg-green-300",
          children: "Diet"
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "",
      children: layout[activeTab]()
    })]
  });
}
const workout = withComponentProps(Workout);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: workout,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function Explore() {
  const listItems = ["Healthy Living", "Dance Central", "Filipino Sports and Games", "Going Outdoors", "Exercises For Certain Ages"];
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h1", {
      className: "py-3 px-2 border-b-4 border-gray-300 bg-slate-50 text-lg font-bold",
      children: "Explore Fitness and Other Things"
    }), /* @__PURE__ */ jsx("ul", {
      className: "divide-y-3 divide-slate-300 [&>li]:p-2 [&>li:nth-child(odd)]:bg-lime-50",
      children: listItems.map((p, index2) => /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "/explore",
          children: p
        })
      }, index2))
    })]
  });
}
const explore = withComponentProps(Explore);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: explore
}, Symbol.toStringTag, { value: "Module" }));
function Profile() {
  const menuItems = {
    first: [{
      name: "General settings",
      value: "general"
    }, {
      name: "Workout settings",
      value: "workout"
    }, {
      name: "Measuring units",
      value: "units"
    }, {
      name: "Language",
      value: "lang"
    }],
    second: ["Rate this app", "Feedback"]
  };
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h1", {
      className: "py-3 px-2 border-b-4 border-gray-300 bg-slate-50 text-lg font-bold",
      children: "User Profile"
    }), /* @__PURE__ */ jsxs("div", {
      className: "space-y-2 [&>ul]:divide-y-2 [&>ul]:divide-slate-400 [&>ul>li:nth-child(odd)]:bg-lime-50 [&>ul>li]:p-2",
      children: [/* @__PURE__ */ jsx("ul", {
        children: menuItems.first.map((p, index2) => /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx(Link, {
            to: `/settings/${p.value}-${p.name}`,
            children: p.name
          })
        }, index2))
      }), /* @__PURE__ */ jsx("ul", {
        children: menuItems.second.map((p, index2) => /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx(Link, {
            to: "",
            children: p
          })
        }, index2))
      })]
    })]
  });
}
const profile = withComponentProps(Profile);
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: profile
}, Symbol.toStringTag, { value: "Module" }));
let masterSettings = {
  general: {
    column: "two",
    content: {
      name: {
        type: "text",
        value: "user"
      },
      birthday: {
        type: "date",
        value: "2000-06-15"
      }
    }
  },
  workout: {
    column: "two",
    content: {
      intensity: {
        type: "select",
        options: ["Easy", "Medium", "Hard"],
        value: "Easy"
      },
      biological_sex: {
        type: "select",
        options: ["Male", "Female"],
        value: "Male"
      }
    }
  },
  units: {
    column: "two",
    content: {}
  },
  lang: {
    column: "one",
    content: {
      options: ["中文", "English", "हिंदी", "Español", "Français", "العربية", "বাংলা", "Русский", "Português", "اُردُو"],
      value: "English"
    }
  }
};
let inputType = {
  text: ([key, data]) => /* @__PURE__ */ jsx("input", {
    id: key,
    type: "text",
    defaultValue: data.value
  }),
  date: ([key, data]) => /* @__PURE__ */ jsx("input", {
    id: key,
    type: "date",
    defaultValue: data.value
  }),
  number: ([key, data]) => /* @__PURE__ */ jsx("input", {
    id: key,
    type: "number",
    defaultValue: data.value
  }),
  select: ([key, data]) => /* @__PURE__ */ jsx("select", {
    id: key,
    defaultValue: data.value,
    children: data.options.map((e, i) => /* @__PURE__ */ jsx("option", {
      value: e,
      children: e
    }, i))
  }),
  novalue: () => /* @__PURE__ */ jsx("p", {
    children: "Page does not exist"
  })
};
function buildTable(settings2) {
  const titleCase = (text) => {
    let temp = text.split("_");
    temp = temp.map((e) => e[0].toUpperCase() + e.substring(1));
    return temp.join(" ");
  };
  const {
    column,
    content
  } = settings2;
  const actions = {
    one: () => {
      const {
        options,
        value
      } = content;
      return options.map((e, i) => /* @__PURE__ */ jsx("div", {
        className: "p-2 cursor-pointer hover:bg-lime-50",
        children: e
      }, i));
    },
    two: () => {
      const filtered = content;
      return Object.entries(filtered).map(([k, v], i) => /* @__PURE__ */ jsxs("div", {
        className: "p-2 grid grid-cols-2",
        children: [/* @__PURE__ */ jsx("label", {
          htmlFor: k,
          className: "text-center",
          children: titleCase(k)
        }), inputType[v.type]([k, v])]
      }, i));
    }
  };
  return /* @__PURE__ */ jsx("div", {
    className: "divide-y-1 divide-slate-300",
    children: actions[column]()
  });
}
function Settings() {
  const [settings2, setSettings] = useState({
    column: "two",
    content: {}
  });
  const {
    id = ""
  } = useParams();
  let [pageName, setPageName] = useState("pageName");
  useEffect(() => {
    let [ind, name] = id.split("-");
    setPageName(name);
    let chosen = masterSettings[ind] ?? null;
    setSettings(chosen);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "md:text-left md:text-2xl p-2 bg-slate-50 ",
      children: [/* @__PURE__ */ jsx(Link, {
        to: "/profile",
        className: "m-4",
        children: "◀"
      }), /* @__PURE__ */ jsx("span", {
        children: pageName
      })]
    }), /* @__PURE__ */ jsx("form", {
      className: "h-[100%] pt-5 divide-y-3 divide-slate-100",
      children: settings2 ? buildTable({
        ...settings2
      }) : /* @__PURE__ */ jsx("div", {
        className: "flex flex-col h-[100%] justify-center",
        children: /* @__PURE__ */ jsx("p", {
          className: "p-2 text-2xl text-center my-auto",
          children: "Page does not exist"
        })
      })
    })]
  });
}
const settings = withComponentProps(Settings);
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: settings
}, Symbol.toStringTag, { value: "Module" }));
function ENutrition() {
  return /* @__PURE__ */ jsx("div", {
    children: "ENutrition"
  });
}
const eNutrition = withComponentProps(ENutrition);
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: eNutrition
}, Symbol.toStringTag, { value: "Module" }));
function QuestionSegment({ data, answerPoolUpdater }) {
  const { name, type, prompt, content } = data;
  const [storedValue, setStoredValue] = useState(
    (content == null ? void 0 : content.defaultValue) ?? 0
  );
  function handleClick() {
    if (type === "multiple choices") {
      let a = (content == null ? void 0 : content.options) ? content == null ? void 0 : content.options[storedValue].label : 0;
      answerPoolUpdater({ prompt: name, response: a });
    } else {
      answerPoolUpdater({ prompt: name, response: storedValue });
    }
    setStoredValue((content == null ? void 0 : content.defaultValue) ?? 0);
  }
  const inputTypesSyntax = {
    "multiple choices": () => /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx("p", { className: "m-4 text-center text-xl", children: prompt }),
      /* @__PURE__ */ jsx("div", { className: "m-2 grid grid-cols-2 gap-2 ", children: (content == null ? void 0 : content.options) ? content.options.map(({ imagepath, label }, i) => /* @__PURE__ */ jsxs(
        "label",
        {
          htmlFor: `c-${i}`,
          className: "p-3 rounded-xl flex flex-col items-center text-center" + (i === storedValue ? " bg-green-100" : ""),
          children: [
            imagepath && imagepath.trim() !== "" && /* @__PURE__ */ jsx(
              "img",
              {
                src: imagepath,
                width: "80px",
                height: "80px",
                className: "rounded-lg"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                className: "hidden",
                name: prompt,
                id: `c-${i}`,
                defaultValue: content.defaultValue,
                onChange: (e) => setStoredValue(i)
              }
            ),
            label
          ]
        },
        i
      )) : /* @__PURE__ */ jsx(Fragment, {}) })
    ] }),
    slider: () => {
      var _a, _b;
      return /* @__PURE__ */ jsxs("div", { className: "flex justify-center", children: [
        /* @__PURE__ */ jsx("p", { children: prompt }),
        /* @__PURE__ */ jsxs(
          "label",
          {
            htmlFor: "a",
            className: "flex flex-col justify-center text-center",
            children: [
              storedValue,
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "a",
                  type: "range",
                  min: (_a = content == null ? void 0 : content.range) == null ? void 0 : _a.min,
                  max: (_b = content == null ? void 0 : content.range) == null ? void 0 : _b.max,
                  defaultValue: content == null ? void 0 : content.defaultValue,
                  onChange: (e) => setStoredValue(e.target.value)
                }
              )
            ]
          }
        )
      ] });
    },
    text: () => /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        defaultValue: content == null ? void 0 : content.defaultValue,
        onChange: (e) => setStoredValue(e.target.value)
      }
    )
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    inputTypesSyntax[type](),
    " ",
    /* @__PURE__ */ jsx("div", { className: "mx-4 my-2 flex justify-end", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleClick,
        className: "p-2 bg-lime-100 hover:bg-lime-300 rounded-full transition duration-200 min-w-[120px] text-center",
        children: "Next"
      }
    ) })
  ] });
}
function meta({}) {
  return [{
    title: "Ironman"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
function WorkoutGenerator() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answerPool, setAnswerPool] = useState([]);
  const questionSyntax = [{
    name: "Current Goal",
    type: "multiple choices",
    prompt: "What is your current fitness goal?",
    content: {
      options: [{
        imagepath: "/images/lifting weights.jpg",
        label: "To build muscles and body strength"
      }, {
        imagepath: "/images/sit-and-reach.jpg",
        label: "To become more flexible"
      }, {
        imagepath: "/images/volleyball.jpg",
        label: "To be better at sports"
      }, {
        imagepath: "/images/rehab.jpg",
        label: "To rehabilitate my body"
      }, {
        imagepath: "/images/weight watch.jpg",
        label: "To maintain a certain weight"
      }, {
        imagepath: "/images/jogging.jpg",
        label: "To develop my stamina"
      }],
      defaultValue: 0
    }
  }, {
    name: "Intensity",
    type: "multiple choices",
    prompt: "How intense do you want the exercise to be?",
    content: {
      options: [{
        label: "Beginner"
      }, {
        label: "Light"
      }, {
        label: "Intermediate"
      }, {
        label: "Heavy"
      }],
      defaultValue: 0
    }
  }];
  function addResponses(data) {
    setAnswerPool((prev) => [...prev, data]);
    setCurrentPage((e) => e + 1);
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "h-screen flex flex-col",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "py-3 px-2 border-b-4 border-gray-300 bg-slate-50 text-lg font-bold",
      children: "Summary"
    }), /* @__PURE__ */ jsx("div", {
      className: "grow block flex flex-col justify-center p-2 space-y-2",
      children: currentPage < questionSyntax.length ? /* @__PURE__ */ jsx(QuestionSegment, {
        data: questionSyntax[currentPage],
        answerPoolUpdater: addResponses
      }) : /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx("table", {
          className: "min-h-[25%] block table-auto rounded-xl bg-orange-50",
          children: /* @__PURE__ */ jsx("tbody", {
            children: answerPool.map(({
              prompt,
              response
            }, i) => /* @__PURE__ */ jsxs("tr", {
              className: "[&>td]:p-2",
              children: [/* @__PURE__ */ jsx("td", {
                className: "",
                children: prompt
              }), /* @__PURE__ */ jsx("td", {
                className: "",
                children: response
              })]
            }, i))
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "grow overflow-auto rounded-xl bg-lime-50"
        }), /* @__PURE__ */ jsx("div", {
          className: "flex justify-center",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/workout",
            className: "p-2 bg-green-100 hover:bg-green-300 rounded-full transition duration-200 min-w-[120px] text-center",
            children: "Accept"
          })
        })]
      })
    })]
  });
}
const workoutGenerator = withComponentProps(WorkoutGenerator);
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: workoutGenerator,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function DietPlanner() {
  return /* @__PURE__ */ jsx("div", {
    children: "DietPlanner"
  });
}
const dietPlanner = withComponentProps(DietPlanner);
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dietPlanner
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DFNyglgu.js", "imports": ["/assets/chunk-XJI4KG32-C1TXMtGA.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DbhCiQTr.js", "imports": ["/assets/chunk-XJI4KG32-C1TXMtGA.js", "/assets/with-props-CPNd9xmd.js"], "css": ["/assets/root-B9zfsYvg.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-2-O0Ab0n.js", "imports": ["/assets/with-props-CPNd9xmd.js", "/assets/chunk-XJI4KG32-C1TXMtGA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/index": { "id": "routes/index", "parentId": "routes/home", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-pUArxYZT.js", "imports": ["/assets/with-props-CPNd9xmd.js", "/assets/chunk-XJI4KG32-C1TXMtGA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/community": { "id": "routes/community", "parentId": "routes/home", "path": "community", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/community-DwVjjUa1.js", "imports": ["/assets/with-props-CPNd9xmd.js", "/assets/chunk-XJI4KG32-C1TXMtGA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/workout": { "id": "routes/workout", "parentId": "routes/home", "path": "workout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/workout-VOhiApnY.js", "imports": ["/assets/with-props-CPNd9xmd.js", "/assets/chunk-XJI4KG32-C1TXMtGA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/explore": { "id": "routes/explore", "parentId": "routes/home", "path": "explore", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/explore-Z9Q-dMHB.js", "imports": ["/assets/with-props-CPNd9xmd.js", "/assets/chunk-XJI4KG32-C1TXMtGA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/profile": { "id": "routes/profile", "parentId": "routes/home", "path": "profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profile-Y-uVCvYJ.js", "imports": ["/assets/with-props-CPNd9xmd.js", "/assets/chunk-XJI4KG32-C1TXMtGA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/settings": { "id": "routes/settings", "parentId": "routes/home", "path": "settings/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/settings-DVLFojEC.js", "imports": ["/assets/with-props-CPNd9xmd.js", "/assets/chunk-XJI4KG32-C1TXMtGA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/eNutrition": { "id": "routes/eNutrition", "parentId": "routes/home", "path": "/eNutrition", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/eNutrition-DzoyxI4d.js", "imports": ["/assets/with-props-CPNd9xmd.js", "/assets/chunk-XJI4KG32-C1TXMtGA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/workoutGenerator": { "id": "routes/workoutGenerator", "parentId": "root", "path": "/generator", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/workoutGenerator-CX4MGasi.js", "imports": ["/assets/with-props-CPNd9xmd.js", "/assets/chunk-XJI4KG32-C1TXMtGA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dietPlanner": { "id": "routes/dietPlanner", "parentId": "root", "path": "/planner", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dietPlanner-fz2_Cr0V.js", "imports": ["/assets/with-props-CPNd9xmd.js", "/assets/chunk-XJI4KG32-C1TXMtGA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-b308cb34.js", "version": "b308cb34" };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/index": {
    id: "routes/index",
    parentId: "routes/home",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/community": {
    id: "routes/community",
    parentId: "routes/home",
    path: "community",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/workout": {
    id: "routes/workout",
    parentId: "routes/home",
    path: "workout",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/explore": {
    id: "routes/explore",
    parentId: "routes/home",
    path: "explore",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "routes/home",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/settings": {
    id: "routes/settings",
    parentId: "routes/home",
    path: "settings/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/eNutrition": {
    id: "routes/eNutrition",
    parentId: "routes/home",
    path: "/eNutrition",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/workoutGenerator": {
    id: "routes/workoutGenerator",
    parentId: "root",
    path: "/generator",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/dietPlanner": {
    id: "routes/dietPlanner",
    parentId: "root",
    path: "/planner",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
