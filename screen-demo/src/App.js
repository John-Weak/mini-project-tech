import { useEffect, useState } from "react";

function App() {
  const API = "https://wysa.johnweak.dev/onboarding";
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState([]);
  useEffect(() => {
    //fetch data for sleep or other type
    fetch(`${API}?type=sleep`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result); //view console to see the result
          setItem(result[0]);
          console.log("SLEEP ONBOARDING DATA");
          console.log(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  let data = [
    "Alternatively, you can also search for Wysa Sleep on the Google Play Store.",
    "demo2",
    "demo3",
  ];
  function nextQuestion() {
    let index = item.stepNumber;
    // only 2 screen demo
    if (index > 2) return;
    if (index == 2) {
      //to stop the demo
      let customItem = item;
      customItem.stepNumber = 3;
      setItem(customItem);

      console.log("SLEEP DATA SAVED,SCORE :");

      //demo user answers
      let userAnswers = [
        {
          stepNumber: 1,
          answers: ["A"],
        },
      ];

      //CALL API TO SAVE DATA
      fetch(`${API}/sleep`, {
        method: "POST",
        body: JSON.stringify(userAnswers),
      })
        .then((res) => {
          console.log(res);
          return res.body;
        })
        .then((result) => {
          console.log(result);
        });
      return;
    }
    setItem(items[index + 1]);
  }

  if (error) {
    return (
      <div className="text-2xl font-semibold text-white text-center">
        Error: {error.message}
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className="text-2xl font-semibold text-white text-center">
        Loading...
      </div>
    );
  } else {
    return (
      <div className="p-2">
        <h1 className="text-2xl font-semibold text-white text-center mt-4 mb-8">
          {item.question}
        </h1>

        {item.answers.length > 0 && (
          <div>
            <ul className="flex items-center justify-center flex-col">
              {item.answers.map((value, index) => {
                return (
                  <li key={value}>
                    <button
                      onClick={nextQuestion} //real app must save user answer's & decorate the marked ans with css
                      className="text-white rounded-sm flex flex-wrap break-normal bg-purple-500 m-2 p-4"
                    >
                      {value}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {item.stepNumber >= 2 && (
          <div className="flex items-center justify-center text-white text-3xl p-4">
            Check Console.
          </div>
        )}

        <div className="flex items-center justify-center">
          <button
            onClick={nextQuestion}
            className="m-12 h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center"
          >
            <svg
              className="rotate-90 bg-yellow-500"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
            >
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
