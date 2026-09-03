const UI = {
    // ✅ Input
       birthDateInput : document.getElementById("birthDate"),

      // ✅ Buttons
       btnCalc : document.getElementById("btnCalc"),
       btnToday : document.getElementById("btnToday"),
       btnClear : document.getElementById("btnClear"),

      // ✅ Output numbers
       outYears : document.getElementById("outYears"),
       outMonths : document.getElementById("outMonths"),
       outDays : document.getElementById("outDays"),

      // ✅ Output text lines
       nextBirthdayLine : document.getElementById("nextBirthdayLine"),
       extraLine : document.getElementById("extraLine"),

      // ✅ Header/status chips
       todayChip : document.getElementById("todayChip"),
       statusChip : document.getElementById("statusChip"),

      // ✅ Message box (neutral/success/error)
       msgBox : document.getElementById("msgBox")
}


        function formatDateForChip(date)
        {
            return date.toLocaleDateString(undefined , 
                {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
        }

        function stripTime(date)
        {
            return new Date(date.getFullYear() , date.getMonth() , date.getDate());
        }

        function daysInMonth(year , monthIndex)
        {
            return new Date(year, monthIndex + 1 , 0).getDate();
        }

        function showMessage(type, text) {
        UI.msgBox.classList.remove("good", "bad");
        if (type === "good") UI.msgBox.classList.add("good");
        if (type === "bad") UI.msgBox.classList.add("bad");
        UI.msgBox.textContent = text;
      }

      function setStatus(text) {
        UI.statusChip.textContent = text;
      }

      function resetOutputs() {
        outYears.textContent = "—";
        outMonths.textContent = "—";
        outDays.textContent = "—";
        nextBirthdayLine.textContent = "Next birthday: —";
        extraLine.textContent = "Extra info: —";
        setStatus("Waiting…");
      }

      function calculateExactAge(birthDate, today)
      {
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            
            const prevMonthIndex = (today.getMonth() - 1 + 12) % 12;

            const prevYear = (today.getMonth()=== 0)?
             today.getFullYear() - 1
             : today.getFullYear();
             const daysInPrevMonth = daysInMonth(prevYear , prevMonthIndex);

             days += daysInPrevMonth;
             months--;
        }

        if(months < 0)
        {
            years --;
            months += 12;
        }

        return {years , months , days};

      }

      function daysUntilNextBirthday(today , birthDate)
      {
        const currentYear = today.getFullYear();
        
        let Next = new Date(
            currentYear ,
            birthDate.getMonth(),
            birthDate.getDate()
        )

        if (stripTime(Next) < stripTime(today)) {
            Next = new Date(
               currentYear + 1 ,
               birthDate.getMonth(),
            birthDate.getDate()
            )
        }

        const msPerDay = 24 * 60 * 60 * 1000;
        const diffMs = stripTime(Next) - stripTime(today);
        const diffDays = Math.round(diffMs / msPerDay);
        
        return { nextBirthdayDate : Next , DaysRemains : diffDays };
      }

      const now = new Date();
      UI.todayChip.textContent = `Today: ${formatDateForChip(now)}`;

       UI.btnCalc.addEventListener("click", () => {
        const birthValue = UI.birthDateInput.value ;
        if (!birthValue) {
          showMessage("bad", "❌ Please select your birth date first.");
          resetOutputs();
          return;
        }

        const [y, m, d] = birthValue.split("-").map(Number);
        const birthDate = new Date(y, m - 1, d);

        const today = stripTime(new Date());

        if (stripTime(birthDate) > today) {
          showMessage("bad", "❌ Birth date cannot be in the future.");
          resetOutputs();
          return;
        }

        if (y < 1900) {
          showMessage("bad", "❌ Please enter a valid year (1900 or later).");
          resetOutputs();
          return;
        }

        const age = calculateExactAge(birthDate , today);

        UI.outYears.textContent = age.years;
        UI.outMonths.textContent = age.months;
        UI.outDays.textContent = age.days;

        const { nextBirthdayDate, daysLeft } = daysUntilNextBirthday(
          birthDate,
          today
        );

        UI.nextBirthdayLine.textContent = `Next birthday: ${formatDateForChip(
          nextBirthdayDate
        )} (in ${daysLeft} day${daysLeft === 1 ? "" : "s"})`;

        const msPerDay = 24 * 60 * 60 * 1000;
        const RestDays = Math.floor((today - stripTime(birthDate)) / msPerDay);
        
         UI.extraLine.textContent = `Extra info: You have lived about ${RestDays.toLocaleString()} days.`;

         showMessage("good", "✅ Age calculated successfully.");
        setStatus("Calculated ✅");
       });
