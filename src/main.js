//https://www.tutorialspoint.com/firebase/firebase_write_data.htm

window.addEventListener("DOMContentLoaded", function() {
  //Refrence to the database
  var database = firebase.database();

  var sortAlpha = "";

  function handleErrors(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Success");
    }
  }

  function displayList() {
    var sortType = "null";
    if (sortAlpha === "down" || sortAlpha === "up") {
      sortType = "name";
    }

    //Find Cars Data
    var ref = firebase.database().ref("Cars");
    ref
      .orderByChild(sortType)
      //.limitToLast(30)
      .on("value", function(snapshot) {
        //Get the data
        var data = snapshot.val();

        //Find all the keys in the data
        //var keys = Object.keys(data)

        var tempArr = [];
        snapshot.forEach(function(child) {
          //console.log(child.val().name, child.key)
          //console.log(data[keys[i]].name, keys[i])

          tempArr.push({
            name: child.val().name,
            key: child.key
          });
        });

        //Firebase DB has no sort descending
        function compare(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }

        if (sortAlpha === "down") {
          tempArr.sort(compare).reverse();
        }
        if (sortAlpha === "up") {
          tempArr.sort(compare);
        }

        var temp = "";

        tempArr.forEach(function(item) {
          temp = temp + "<li style='margin-bottom: 10px;'>";
          //temp = temp + child.val().name
          temp =
            temp +
            "<button style='float: right;' class='delete' data-key='" +
            item.key +
            "'>X</button>";
          temp =
            temp +
            "<input type='text' class='" +
            item.key +
            "' value='" +
            item.name +
            "'><button style='' class='edit' data-key='" +
            item.key +
            "'>Edit</button>";
          temp = temp + "</li>";
        });

        var list = document.querySelector(".list");
        list.innerHTML = temp;

        //Edit Btns
        var editBtns = document.querySelectorAll(".edit");

        editBtns.forEach(function(item) {
          item.addEventListener("click", function() {
            var key = this.dataset.key;
            var newVal = document.querySelector("." + key).value;

            console.log("edit", key, newVal);

            database.ref("Cars/" + key).set({
              name: newVal
            });
          });
        });

        //Delete Btns
        var deleteBtns = document.querySelectorAll(".delete");

        deleteBtns.forEach(function(item) {
          item.addEventListener("click", function() {
            var key = this.dataset.key;
            console.log("del", key);

            database
              .ref("Cars")
              .child(key)
              .remove();
          });
        });
      });
  }
  displayList();

  document.getElementById("create").addEventListener("click", function() {
    var ref = database.ref("Cars");

    var data = {
      name: document.querySelector("input").value
    };

    ref.push(data, handleErrors);
  });

  document.getElementById("sortAsc").addEventListener("click", function() {
    sortAlpha = "up";

    displayList();
  });

  document.getElementById("sortDesc").addEventListener("click", function() {
    sortAlpha = "down";

    displayList();
  });
  console.log("test3");
});
