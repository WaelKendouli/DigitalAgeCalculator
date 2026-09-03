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

      