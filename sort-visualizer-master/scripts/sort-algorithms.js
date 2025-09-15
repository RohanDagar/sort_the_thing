/* This file defines a class sortAlgorithms, which contains implementations of various sorting algorithms (Bubble, Selection, Insertion, Merge, Quick). It also relies on a helper class (Helper) to handle visuals (like coloring, swapping, pausing).
 */

class sortAlgorithms {
    constructor(time) {
        // yha list us array ko nhi balki un sbhi div ko store kar rhi hai jo represent kar rhe hai list ko jo app.js mai bna tha
        this.list = document.querySelectorAll(".cell"); // cell us class ka naam ha jo baad mai append ki gyi thi (wo element jo ki random array ko contain karta hai)
        this.size = this.list.length;
        this.time = time;
        this.help = new Helper(this.time, this.list);
       

    }

    // BUBBLE SORT

    /* Explanation buubble sort: 
    for (let i = 0; i < this.size - 1; ++i)
Outer loop: kitni baar comparisons hone hain.

Har pass mein ek last element sahi jagah chala jaata hai, isliye size - 1 tak hi loop.

for (let j = 0; j < this.size - i - 1; ++j)
Inner loop: do side-by-side elements compare karta hai.

-i ka matlab: last ke i elements already sorted ho chuke hain.

await this.help.mark(j); await this.help.mark(j+1);
mark() dono elements ko highlight (e.g. yellow) karta hai — jise visual user samajh sake ki ab ye compare ho rahe hain.

if (await this.help.compare(j, j+1))
compare() function check karta hai ki left element > right element hai ya nahi.

Agar left > right, toh swap hona chahiye.

await this.help.swap(j, j+1);
Ye dono bars ki heights, values ko swap karta hai visually.

await this.help.unmark(j); await this.help.unmark(j+1);
Compare ke baad unhe un-highlight kar dete hain.

this.list[this.size - i - 1].setAttribute("class", "cell done");
Har pass ke baad jo sabse bada element sahi jagah gaya hai, usko green (done) mark kar dete hain.

this.list[0].setAttribute("class", "cell done");
End mein sab sorted hote hain, but loop ke baad first element reh jaata hai usko bhi green mark kar dete hain.


     */
    BubbleSort = async () => {
        for(let i = 0 ; i < this.size - 1 ; ++i) {
            for(let j = 0 ; j < this.size - i - 1 ; ++j) {
                await this.help.mark(j);
                await this.help.mark(j+1);
                if(await this.help.compare(j, j+1)) {
                    await this.help.swap(j, j+1);
                }
                await this.help.unmark(j);
                await this.help.unmark(j+1);
            }
            this.list[this.size - i - 1].setAttribute("class", "cell done");
        }
        this.list[0].setAttribute("class", "cell done");  // yai line isliye add ki kyoki upper wali line jo green kar rhi hai wo (size-1) baar chlegi per elemen toh size jitne hote hai that's why to cover the first element hm usko alag sai green karenge 
    }

    // INSERTION SORT

    /* Explanation : 
        take i = 0 and j = i 
        put condtion of J>=0 and value at J < value at J+1 if yes toh dono ko replace kar do 
        if not toh iska matlab ki value sshi jgha per place ho chuki hai 
        here this.help.mark use to mark the pillor 
    */
    InsertionSort = async () => {
        for(let i = 0 ; i < this.size - 1 ; ++i) {
            let j = i;
            while(j >= 0 && await this.help.compare(j, j+1))  // "this.help.compare(j, j + 1) batata hai ki j index par value badi hai j+1 index wali value se.
                                                               //Agar haan, to true return karta hai. Agar nahi, to false."                                                                                                      
                         /*  Iska Kaam:
            Yeh while loop tab tak chalti hai jab tak:
           (i) j valid index hai (matlab array ke andar hai)
           (ii) Aur j wale element ka value bada hai j+1 wale element se. */ 
           {
                await this.help.mark(j);   // j element ko highlight karo
                await this.help.mark(j+1);  // j+1 element ko bhi highlight karo
                await this.help.pause();     // thoda ruk jao (animation ke liye)
                await this.help.swap(j, j+1);  // dono ko swap karo
                await this.help.unmark(j);     // unhighlight karo
                await this.help.unmark(j+1);    // unhighlight karo
                j -= 1;
            }
        }
        for(let counter = 0 ; counter < this.size ; ++counter) {
            this.list[counter].setAttribute("class", "cell done");    //Sorting complete hone ke baad har element ko green ("done") mark kar dete hain.
                                                                     //Ye visual hai ki sab sahi jagah pe hain
        }
    }

    // SELECTION SORT
    /* make i = 0 and run the loop 
       assign minIndex = i  
       make loop jha j = i 
       simple yai phechano ki kaunsa minIndex hai iske liye compare karo min index ko j 
       if value at minIndex > value at (j) then minIndex = j 
        jab minIndex mil jaye toh simple minindex ko j sai wap kaar de
      coloring 
      markspl provide special pink color
      mark provide green color
      unmark remove green color
      class = cell done add green color to the element(check css)  
     */
    SelectionSort = async () => {
        for(let i = 0 ; i < this.size ; ++i) {
            let minIndex = i;
            for(let j = i ; j < this.size ; ++j) {
                await this.help.markSpl(minIndex);
                await this.help.mark(j);
                if(await this.help.compare(minIndex, j)) {
                    await this.help.unmark(minIndex);
                    minIndex = j;
                }
                await this.help.unmark(j);
                await this.help.markSpl(minIndex);
            }
            await this.help.mark(minIndex);
            await this.help.mark(i);
            await this.help.pause();
            await this.help.swap(minIndex, i);
            await this.help.unmark(minIndex);
            this.list[i].setAttribute("class", "cell done");
        }
    }

    // MERGE SORT

    /* Explain : 
     MergeSort():
    Isme sirf ek kaam ho raha hai:
     this.MergeDivider(0, this.size - 1) — poori list ko divide karke sort karo.
     Sorting ke baad, sabhi elements ko green (done) bana deta hai (visual feedback ke liye).
     */
    MergeSort = async () => {
        await this.MergeDivider(0, this.size - 1);
        for(let counter = 0 ; counter < this.size ; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
    }


    /* Explain : 
    Har call me array ko do parts me divide kiya ja raha hai:
          Left half → start to mid
          Right half → mid+1 to end
          Ye process recursively hota hai jab tak sirf ek element na bach jaye.
          Jab dono halves ready ho jaati hain → Merge(start, mid, end) unhe merge karta hai.
     */
    MergeDivider = async (start, end) => {
        if(start < end) {
            let mid = start + Math.floor((end - start)/2); // Yeh decimal ko floor karta hai, yaani neeche round karta hai. (means 3/2 = 1)
            await this.MergeDivider(start, mid);
            await this.MergeDivider(mid+1, end);
            await this.Merge(start, mid, end);
        }
    } 

    /* Explanation : 
      1) first make new list to store the merge sorted list 
      2) make frontcounter = start , midcounter = mid + 1
       here hm 2 list ko alag consider karenge List1 range (start to mid) and List2 range(mid+1 to end)
      3) ab dono list mai sai jika value chota ho usko newList mai daal do 
      4) jo list bach jaye usko as it is daal do 
      5) baad mai list ki value ko new list ki  value sai replace kar do
        */

    Merge = async (start, mid, end) => {
        let newList = new Array();
        let frontcounter = start; 
        let midcounter = mid + 1;  
        
        while(frontcounter <= mid && midcounter <= end) {
            let fvalue = Number(this.list[frontcounter].getAttribute("value"));
            let svalue = Number(this.list[midcounter].getAttribute("value"));
            if(fvalue >= svalue) {
                newList.push(svalue);
                ++midcounter;
            }
            else {
                newList.push(fvalue);
                ++frontcounter;
            }
        }
        while(frontcounter <= mid) {
            newList.push(Number(this.list[frontcounter].getAttribute("value")));
            ++frontcounter;
        }
        while(midcounter <= end) {
            newList.push(Number(this.list[midcounter].getAttribute("value")));
            ++midcounter;
        }

        for(let c = start ; c <= end ; ++c) {
            this.list[c].setAttribute("class", "cell current");
        }

        // ab purane wale list ki valu  ko newlist ki value  sai bdalne kai liye
        for(let c = start, point = 0 ; c <= end && point < newList.length; 
            ++c, ++point) // here point represent the address of the newlist   
            {
                await this.help.pause();
                this.list[c].setAttribute("value", newList[point]); // set the value of list according to new list
                this.list[c].style.height = `${3.5*newList[point]}px`; // set the height of the bar according to new list
        }
        for(let c = start ; c <= end ; ++c) {
            this.list[c].setAttribute("class", "cell");
        }
    }

    // QUICK SORT  

    /* Explanation : 
      1) Quick sort divide and conqurer base per kaam karta hai
      2) isne phele Quickdivider ko call kiya jo ki partion kar denga 
      3) partition function will set the pivot element at its correct position such that left side element is small and right side element is large
      4) partition function will give us pivot element index 
      5) uske baad isne left and right side kai liye function phir sai call kar diya 

    */
    QuickSort = async () => {
        await this.QuickDivider(0, this.size-1);
        for(let c = 0 ; c < this.size ; ++c) {
            this.list[c].setAttribute("class", "cell done");
        }
    }

    QuickDivider = async (start, end) => {
        if(start < end) {
            let pivot = await this.Partition(start, end); // gave the pivot element
            await this.QuickDivider(start, pivot-1);  // call for the left side
            await this.QuickDivider(pivot+1, end);  // call for the right side
        }
    }
     
    /* Explanation : 
      1) store the pivot element value at pivot
      2) make constant prev_index which have inition value of start-1
      3) prev_index is use for tracing and to set the pivot element at its correct position 
      4) isne akh loop run kiya jo ki start sai aur end-1 tak run karenga kyoki end per toh pivot hai hi 
      5) current_value will store the current value 
      6) if currValue < pivot then prev_index =+1 and replace the currentvalue with the value at prev_index 
      7) asa karne sai pivot ki shi postion ( jo end mai hongi prev_index+1 ) kai left chota aur right bdi value aa jayngi
      8) replace pivot with prev_index +1 
      */
    Partition = async (start, end) => {
        let pivot = this.list[end].getAttribute("value");
        let prev_index = start - 1;

        await this.help.markSpl(end);
        for(let c = start ; c < end ; ++c) {
            let currValue = Number(this.list[c].getAttribute("value"));
            await this.help.mark(c);
            if(currValue < pivot) {
                prev_index += 1;
                await this.help.mark(prev_index);
                await this.help.swap(c, prev_index);
                await this.help.unmark(prev_index);
            }
            await this.help.unmark(c);
        }
        await this.help.swap(prev_index+1, end); // swapping the pivot with prev_index + 1
        await this.help.unmark(end);
        return prev_index + 1;  // returning the pivot element index 
    }
};   //  To understand logic more effictely run the code on chat gpt for  [10, 40, 50, 20, 35, 30]