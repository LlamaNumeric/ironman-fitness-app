import { type RouteConfig, route, index, layout, prefix} from "@react-router/dev/routes";

export default [
    layout("./routes/home.tsx", [
        index("routes/index.tsx"),
        route("community","./routes/community.tsx"),
        route("workout","./routes/workout.tsx"),
        route("explore","./routes/explore.tsx"),
        route("profile","./routes/profile.tsx"),
        route("settings/:id","./routes/settings.tsx"),
        route("/eNutrition", "./routes/eNutrition.tsx")
    ]),
    route("/generator","./routes/workoutGenerator.tsx"),
    route("/planner","./routes/dietPlanner.tsx")


] satisfies RouteConfig;
