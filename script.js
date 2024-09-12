const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let loginCheck = false;



const fitSenseMonthlyPlan = [
    {
        category: "Underweight",
        exercisePlan: [
            {
                week: 1,
                exercises: [
                    { name: "Strength Training", days: ["Monday", "Wednesday", "Friday"], duration: "30 mins" },
                    { name: "Yoga", days: ["Tuesday", "Thursday"], duration: "30 mins" },
                    { name: "Walking", days: ["Daily"], duration: "20 mins" }
                ]
            },
            {
                week: 2,
                exercises: [
                    { name: "Strength Training", days: ["Monday", "Wednesday", "Friday"], duration: "35 mins" },
                    { name: "Yoga", days: ["Tuesday", "Thursday"], duration: "30 mins" },
                    { name: "Walking", days: ["Daily"], duration: "25 mins" }
                ]
            },
            {
                week: 3,
                exercises: [
                    { name: "Strength Training", days: ["Monday", "Wednesday", "Friday"], duration: "35 mins" },
                    { name: "Pilates", days: ["Tuesday", "Thursday"], duration: "30 mins" },
                    { name: "Walking", days: ["Daily"], duration: "30 mins" }
                ]
            },
            {
                week: 4,
                exercises: [
                    { name: "Strength Training", days: ["Monday", "Wednesday", "Friday"], duration: "40 mins" },
                    { name: "Yoga", days: ["Tuesday", "Thursday"], duration: "35 mins" },
                    { name: "Walking", days: ["Daily"], duration: "30 mins" }
                ]
            }
        ],
        nutritionPlan: [
            {
                week: 1,
                meals: {
                    breakfast: ["Oatmeal with milk and nuts", "Fruit smoothie with protein powder"],
                    lunch: ["Grilled chicken with quinoa and vegetables", "Whole grain pasta with lean meat"],
                    dinner: ["Salmon with brown rice and avocado", "Lentil soup with whole grain bread"],
                    snacks: ["Nuts and seeds", "Greek yogurt with honey and berries"]
                }
            },
            {
                week: 2,
                meals: {
                    breakfast: ["Whole grain pancakes with berries", "Scrambled eggs with cheese"],
                    lunch: ["Turkey sandwich with whole grain bread", "Chicken stir-fry with brown rice"],
                    dinner: ["Beef stew with potatoes", "Grilled shrimp with couscous"],
                    snacks: ["Smoothie with almond butter", "Protein bars"]
                }
            },
            {
                week: 3,
                meals: {
                    breakfast: ["Bagel with cream cheese and smoked salmon", "Fruit parfait with granola"],
                    lunch: ["Pasta with meatballs", "Tuna salad with whole grain crackers"],
                    dinner: ["Roast chicken with mashed potatoes", "Pork chops with apple sauce and veggies"],
                    snacks: ["Cheese and whole grain crackers", "Banana with peanut butter"]
                }
            },
            {
                week: 4,
                meals: {
                    breakfast: ["French toast with maple syrup and berries", "Veggie omelet with toast"],
                    lunch: ["Chicken curry with rice", "Baked fish tacos with slaw"],
                    dinner: ["Lasagna with side salad", "BBQ ribs with corn and green beans"],
                    snacks: ["Trail mix", "Fruit with cottage cheese"]
                }
            }
        ]
    },
    {
        category: "Overweight",
        exercisePlan: [
            {
                week: 1,
                exercises: [
                    { name: "Cardio (Brisk Walking)", days: ["Monday", "Wednesday", "Friday"], duration: "30 mins" },
                    { name: "Strength Training", days: ["Tuesday", "Thursday"], duration: "20 mins" },
                    { name: "Swimming", days: ["Saturday"], duration: "30 mins" }
                ]
            },
            {
                week: 2,
                exercises: [
                    { name: "Cardio (Cycling)", days: ["Monday", "Wednesday", "Friday"], duration: "40 mins" },
                    { name: "Strength Training", days: ["Tuesday", "Thursday"], duration: "25 mins" },
                    { name: "Swimming", days: ["Saturday"], duration: "35 mins" }
                ]
            },
            {
                week: 3,
                exercises: [
                    { name: "Cardio (Running)", days: ["Monday", "Wednesday", "Friday"], duration: "45 mins" },
                    { name: "Strength Training", days: ["Tuesday", "Thursday"], duration: "30 mins" },
                    { name: "Swimming", days: ["Saturday"], duration: "40 mins" }
                ]
            },
            {
                week: 4,
                exercises: [
                    { name: "Cardio (Elliptical)", days: ["Monday", "Wednesday", "Friday"], duration: "50 mins" },
                    { name: "Strength Training", days: ["Tuesday", "Thursday"], duration: "35 mins" },
                    { name: "Swimming", days: ["Saturday"], duration: "45 mins" }
                ]
            }
        ],
        nutritionPlan: [
            {
                week: 1,
                meals: {
                    breakfast: ["Whole grain toast with avocado", "Scrambled eggs with spinach"],
                    lunch: ["Grilled chicken salad with mixed greens", "Brown rice with steamed vegetables"],
                    dinner: ["Baked fish with vegetables", "Quinoa with black beans and salsa"],
                    snacks: ["Carrot sticks with hummus", "Apple slices with peanut butter"]
                }
            },
            {
                week: 2,
                meals: {
                    breakfast: ["Smoothie with berries and spinach", "Greek yogurt with nuts"],
                    lunch: ["Grilled fish with quinoa", "Turkey wrap with whole wheat tortilla"],
                    dinner: ["Chicken stir-fry with brown rice", "Beef and vegetable stew"],
                    snacks: ["Celery sticks with almond butter", "Protein shake"]
                }
            },
            {
                week: 3,
                meals: {
                    breakfast: ["Oatmeal with almond milk", "Protein pancakes"],
                    lunch: ["Chickpea salad with olive oil dressing", "Grilled salmon with veggies"],
                    dinner: ["Vegetable curry with brown rice", "Lean beef with roasted sweet potatoes"],
                    snacks: ["Fruit salad", "Cottage cheese with pineapple"]
                }
            },
            {
                week: 4,
                meals: {
                    breakfast: ["Smoothie bowl with granola", "Egg muffins with veggies"],
                    lunch: ["Quinoa salad with chickpeas and cucumber", "Chicken Caesar salad"],
                    dinner: ["Shrimp stir-fry with rice noodles", "Baked chicken with Brussels sprouts"],
                    snacks: ["Yogurt with chia seeds", "Sliced cucumber with guacamole"]
                }
            }
        ]
    },
    {
        category: "Pre-Obesity",
        exercisePlan: [
            {
                week: 1,
                exercises: [
                    { name: "Cardio (Walking)", days: ["Monday", "Wednesday", "Friday"], duration: "30 mins" },
                    { name: "Low-Intensity Strength Training", days: ["Tuesday", "Thursday"], duration: "20 mins" },
                    { name: "Swimming", days: ["Saturday"], duration: "30 mins" }
                ]
            },
            {
                week: 2,
                exercises: [
                    { name: "Cardio (Cycling)", days: ["Monday", "Wednesday", "Friday"], duration: "35 mins" },
                    { name: "Low-Intensity Strength Training", days: ["Tuesday", "Thursday"], duration: "25 mins" },
                    { name: "Swimming", days: ["Saturday"], duration: "35 mins" }
                ]
            },
            {
                week: 3,
                exercises: [
                    { name: "Cardio (Brisk Walking)", days: ["Monday", "Wednesday", "Friday"], duration: "40 mins" },
                    { name: "Moderate Strength Training", days: ["Tuesday", "Thursday"], duration: "30 mins" },
                    { name: "Swimming", days: ["Saturday"], duration: "40 mins" }
                ]
            },
            {
                week: 4,
                exercises: [
                    { name: "Cardio (Elliptical)", days: ["Monday", "Wednesday", "Friday"], duration: "45 mins" },
                    { name: "Moderate Strength Training", days: ["Tuesday", "Thursday"], duration: "35 mins" },
                    { name: "Swimming", days: ["Saturday"], duration: "45 mins" }
                ]
            }
        ],
        nutritionPlan: [
            {
                week: 1,
                meals: {
                    breakfast: ["Smoothie with greens and protein powder", "Whole grain toast with peanut butter"],
                    lunch: ["Salad with grilled chicken and vinaigrette", "Brown rice with steamed broccoli and tofu"],
                    dinner: ["Baked fish with quinoa and green beans", "Stir-fried vegetables with brown rice"],
                    snacks: ["Almonds", "Low-fat yogurt with berries"]
                }
            },
            {
                week: 2,
                meals: {
                    breakfast: ["Greek yogurt with honey and nuts", "Egg white omelette with vegetables"],
                    lunch: ["Quinoa salad with beans", "Chicken wrap with whole grain tortilla"],
                    dinner: ["Grilled shrimp with mixed vegetables", "Baked chicken with sweet potato"],
                    snacks: ["Sliced apple with almond butter", "Veggie sticks with hummus"]
                }
            },
            {
                week: 3,
                meals: {
                    breakfast: ["Smoothie with banana, spinach, and protein powder", "Oatmeal with fruit and seeds"],
                    lunch: ["Mixed bean salad", "Sushi with brown rice and vegetables"],
                    dinner: ["Lean turkey with roasted Brussels sprouts", "Vegetable stir-fry with tofu"],
                    snacks: ["Carrot sticks with hummus", "Low-fat cheese with whole grain crackers"]
                }
            },
            {
                week: 4,
                meals: {
                    breakfast: ["Chia pudding with berries", "Whole grain waffles with almond butter"],
                    lunch: ["Veggie burger with a side salad", "Grilled chicken with couscous and veggies"],
                    dinner: ["Pasta with lean meat sauce", "Baked fish with sweet potato fries"],
                    snacks: ["Mixed nuts", "Fruit with cottage cheese"]
                }
            }
        ]
    },
    {
        category: "Obesity Class 1",
        exercisePlan: [
            {
                week: 1,
                exercises: [
                    { name: "Walking", days: ["Monday", "Wednesday", "Friday"], duration: "30 mins" },
                    { name: "Water Aerobics", days: ["Tuesday", "Thursday"], duration: "20 mins" },
                    { name: "Light Strength Training", days: ["Saturday"], duration: "20 mins" }
                ]
            },
            {
                week: 2,
                exercises: [
                    { name: "Walking", days: ["Monday", "Wednesday", "Friday"], duration: "35 mins" },
                    { name: "Water Aerobics", days: ["Tuesday", "Thursday"], duration: "25 mins" },
                    { name: "Light Strength Training", days: ["Saturday"], duration: "25 mins" }
                ]
            },
            {
                week: 3,
                exercises: [
                    { name: "Walking", days: ["Monday", "Wednesday", "Friday"], duration: "40 mins" },
                    { name: "Water Aerobics", days: ["Tuesday", "Thursday"], duration: "30 mins" },
                    { name: "Light Strength Training", days: ["Saturday"], duration: "30 mins" }
                ]
            },
            {
                week: 4,
                exercises: [
                    { name: "Walking", days: ["Monday", "Wednesday", "Friday"], duration: "45 mins" },
                    { name: "Water Aerobics", days: ["Tuesday", "Thursday"], duration: "35 mins" },
                    { name: "Light Strength Training", days: ["Saturday"], duration: "35 mins" }
                ]
            }
        ],
        nutritionPlan: [
            {
                week: 1,
                meals: {
                    breakfast: ["Smoothie with protein powder and greens", "Whole grain cereal with milk"],
                    lunch: ["Salad with lean protein", "Whole grain wrap with veggies"],
                    dinner: ["Baked fish with steamed vegetables", "Stir-fry with tofu and brown rice"],
                    snacks: ["Fresh fruit", "Veggie sticks with hummus"]
                }
            },
            {
                week: 2,
                meals: {
                    breakfast: ["Oatmeal with almond milk and berries", "Scrambled eggs with spinach"],
                    lunch: ["Quinoa with beans and vegetables", "Chicken breast with steamed broccoli"],
                    dinner: ["Grilled turkey with mixed greens", "Baked salmon with quinoa and asparagus"],
                    snacks: ["Almonds", "Low-fat yogurt with fruit"]
                }
            },
            {
                week: 3,
                meals: {
                    breakfast: ["Greek yogurt with nuts and seeds", "Whole grain toast with avocado"],
                    lunch: ["Brown rice with lean beef and vegetables", "Lentil soup with whole grain bread"],
                    dinner: ["Chicken stir-fry with vegetables", "Grilled shrimp with quinoa and vegetables"],
                    snacks: ["Cucumber slices with hummus", "Fruit with cottage cheese"]
                }
            },
            {
                week: 4,
                meals: {
                    breakfast: ["Smoothie bowl with chia seeds", "Oatmeal with banana and peanut butter"],
                    lunch: ["Veggie wrap with whole grain tortilla", "Chicken Caesar salad with light dressing"],
                    dinner: ["Baked cod with sweet potato", "Pasta with marinara and veggies"],
                    snacks: ["Protein bars", "Mixed nuts"]
                }
            }
        ]
    },
    {
        category: "Obesity Class 2",
        exercisePlan: [
            {
                week: 1,
                exercises: [
                    { name: "Walking", days: ["Monday", "Wednesday", "Friday"], duration: "30 mins" },
                    { name: "Chair Exercises", days: ["Tuesday", "Thursday"], duration: "20 mins" },
                    { name: "Light Strength Training", days: ["Saturday"], duration: "20 mins" }
                ]
            },
            {
                week: 2,
                exercises: [
                    { name: "Walking", days: ["Monday", "Wednesday", "Friday"], duration: "35 mins" },
                    { name: "Chair Exercises", days: ["Tuesday", "Thursday"], duration: "25 mins" },
                    { name: "Light Strength Training", days: ["Saturday"], duration: "25 mins" }
                ]
            },
            {
                week: 3,
                exercises: [
                    { name: "Walking", days: ["Monday", "Wednesday", "Friday"], duration: "40 mins" },
                    { name: "Chair Exercises", days: ["Tuesday", "Thursday"], duration: "30 mins" },
                    { name: "Light Strength Training", days: ["Saturday"], duration: "30 mins" }
                ]
            },
            {
                week: 4,
                exercises: [
                    { name: "Walking", days: ["Monday", "Wednesday", "Friday"], duration: "45 mins" },
                    { name: "Chair Exercises", days: ["Tuesday", "Thursday"], duration: "35 mins" },
                    { name: "Light Strength Training", days: ["Saturday"], duration: "35 mins" }
                ]
            }
        ],
        nutritionPlan: [
            {
                week: 1,
                meals: {
                    breakfast: ["Smoothie with greens and berries", "Oatmeal with chia seeds and nuts"],
                    lunch: ["Salad with lean protein", "Whole grain sandwich with veggies"],
                    dinner: ["Baked fish with steamed vegetables", "Chicken stir-fry with brown rice"],
                    snacks: ["Fresh fruit", "Cucumber slices with hummus"]
                }
            },
            {
                week: 2,
                meals: {
                    breakfast: ["Whole grain cereal with milk", "Scrambled eggs with vegetables"],
                    lunch: ["Quinoa with chickpeas and vegetables", "Lean beef with steamed broccoli"],
                    dinner: ["Grilled chicken with mixed greens", "Baked salmon with sweet potato"],
                    snacks: ["Almonds", "Low-fat yogurt with fruit"]
                }
            },
            {
                week: 3,
                meals: {
                    breakfast: ["Greek yogurt with nuts and seeds", "Smoothie with protein powder"],
                    lunch: ["Brown rice with lean turkey and vegetables", "Vegetable soup with whole grain bread"],
                    dinner: ["Chicken stir-fry with vegetables", "Baked cod with quinoa and vegetables"],
                    snacks: ["Carrot sticks with hummus", "Fruit with cottage cheese"]
                }
            },
            {
                week: 4,
                meals: {
                    breakfast: ["Smoothie bowl with granola", "Oatmeal with banana and almond butter"],
                    lunch: ["Veggie wrap with whole grain tortilla", "Chicken Caesar salad with light dressing"],
                    dinner: ["Baked fish with sweet potato fries", "Pasta with lean meat sauce and vegetables"],
                    snacks: ["Protein bars", "Mixed nuts"]
                }
            }
        ]
    },
    {
        category: "Obesity Class 3",
        exercisePlan: [
            {
                week: 1,
                exercises: [
                    { name: "Chair Exercises", days: ["Monday", "Wednesday", "Friday"], duration: "20 mins" },
                    { name: "Light Stretching", days: ["Tuesday", "Thursday"], duration: "15 mins" },
                    { name: "Walking", days: ["Saturday"], duration: "15 mins" }
                ]
            },
            {
                week: 2,
                exercises: [
                    { name: "Chair Exercises", days: ["Monday", "Wednesday", "Friday"], duration: "25 mins" },
                    { name: "Light Stretching", days: ["Tuesday", "Thursday"], duration: "20 mins" },
                    { name: "Walking", days: ["Saturday"], duration: "20 mins" }
                ]
            },
            {
                week: 3,
                exercises: [
                    { name: "Chair Exercises", days: ["Monday", "Wednesday", "Friday"], duration: "30 mins" },
                    { name: "Light Stretching", days: ["Tuesday", "Thursday"], duration: "25 mins" },
                    { name: "Walking", days: ["Saturday"], duration: "25 mins" }
                ]
            },
            {
                week: 4,
                exercises: [
                    { name: "Chair Exercises", days: ["Monday", "Wednesday", "Friday"], duration: "35 mins" },
                    { name: "Light Stretching", days: ["Tuesday", "Thursday"], duration: "30 mins" },
                    { name: "Walking", days: ["Saturday"], duration: "30 mins" }
                ]
            }
        ],
        nutritionPlan: [
            {
                week: 1,
                meals: {
                    breakfast: ["Smoothie with greens and protein powder", "Whole grain toast with avocado"],
                    lunch: ["Salad with lean protein", "Vegetable soup with whole grain bread"],
                    dinner: ["Baked fish with vegetables", "Chicken stir-fry with brown rice"],
                    snacks: ["Fresh fruit", "Veggie sticks with hummus"]
                }
            },
            {
                week: 2,
                meals: {
                    breakfast: ["Oatmeal with berries and nuts", "Scrambled eggs with spinach"],
                    lunch: ["Quinoa with chickpeas and vegetables", "Grilled turkey with steamed broccoli"],
                    dinner: ["Grilled chicken with mixed greens", "Baked salmon with sweet potato"],
                    snacks: ["Almonds", "Low-fat yogurt with fruit"]
                }
            },
            {
                week: 3,
                meals: {
                    breakfast: ["Greek yogurt with chia seeds and nuts", "Smoothie with protein powder"],
                    lunch: ["Brown rice with lean beef and vegetables", "Vegetable soup with whole grain bread"],
                    dinner: ["Chicken stir-fry with vegetables", "Baked cod with quinoa and vegetables"],
                    snacks: ["Carrot sticks with hummus", "Fruit with cottage cheese"]
                }
            },
            {
                week: 4,
                meals: {
                    breakfast: ["Smoothie bowl with granola", "Oatmeal with banana and almond butter"],
                    lunch: ["Veggie wrap with whole grain tortilla", "Chicken Caesar salad with light dressing"],
                    dinner: ["Baked fish with sweet potato fries", "Pasta with lean meat sauce and vegetables"],
                    snacks: ["Protein bars", "Mixed nuts"]
                }
            }
        ]
    }
];



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    if (loginCheck === false)
        res.sendFile(__dirname + "/land.html");
    else
        res.sendFile(__dirname + "/index.html");
});
app.get("/fitness", (req, res) => {
    res.sendFile(__dirname + "/fitness.html");
});
app.get("/nutrition", (req, res) => {
    res.sendFile(__dirname + "/nutrition.html");
});
app.get("/support", (req, res) => {
    res.sendFile(__dirname + "/support.html");
});
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.get("/logout",(req,res)=>{
    loginCheck = false;
    res.redirect("/");
});

app.post("/", (req, res) => {
    const user = req.body["username"];
    const pass = req.body["password"];
    if (user === "admin" && pass === "admin") {
        loginCheck = true;
        res.sendFile(__dirname + "/index.html");
    } else {
        res.sendFile(__dirname + "/login.html");
    }
});



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});