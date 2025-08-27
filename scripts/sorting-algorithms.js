class SortingAlgorithms{
    constructor(time){
        this.list = document.querySelectorAll(".bar");
        this.size = this.list.length;
        this.time = time;
        this.util =  new Utility(this.time, this.list);
    }

    // Insertion Sort
    InsertionSort = async () => {
        for(let i = 0 ; i < this.size ; ++i) {
            let j = i;
            while(j > 0 && await this.util.compare(j-1, j)) {
                await this.util.mark(j);
                await this.util.mark(j-1);
                await this.util.pause();
                await this.util.swap(j, j-1);
                await this.util.unmark(j);
                await this.util.unmark(j-1);
                j -= 1;
            }
        }
        for(let counter = 0 ; counter < this.size ; counter++) {
            this.list[counter].setAttribute("class", "bar done");
        }
    }

    // Bubble Sort
    BubbleSort = async () => {
        for(let i = this.size-1 ; i >=1 ; --i) {
            for(let j = 0 ; j <= i - 1 ; ++j) {
                await this.util.mark(j);
                await this.util.mark(j+1);
                if(await this.util.compare(j, j+1)) {
                    await this.util.swap(j, j+1);
                }
                await this.util.unmark(j);
                await this.util.unmark(j+1);
            }
            this.list[i].setAttribute("class", "bar done");
        }
        this.list[0].setAttribute("class", "bar done");
    }

    // Selection Sort
    SelectionSort = async () => {
        for(let i = 0 ; i < this.size ; ++i) {
            let min = i;
            for(let j = i ; j < this.size ; ++j) {
                await this.util.markMin(min);
                await this.util.mark(j);
                if(await this.util.compare(min, j)) {
                    await this.util.unmark(min);
                    min = j;
                }
                await this.util.unmark(j);
                await this.util.markMin(min);
            }
            await this.util.mark(min);
            await this.util.mark(i);
            await this.util.pause();
            await this.util.swap(min, i);
            await this.util.unmark(min);
            this.list[i].setAttribute("class", "bar done");
        }
    }

    // Merge Sort
    MergeSort = async () => {
        await this.MergeReduce(0, this.size-1);
        for(let i = 0 ; i < this.size ; ++i) {
            this.list[i].setAttribute("class", "bar done");
        }
    }

    MergeReduce =  async(left, right) => {
        if(left < right){
            let mid =  left +  Math.floor((right-left)/2);
            await this.MergeReduce(left, mid);
            await this.MergeReduce(mid+1, right);
            await this.Merge(left, mid,right);
        }
    }

    Merge = async (left, mid, right) => {
        let ls = new Array();
        let i = left;
        let j = mid + 1;

        while(i <= mid && j <= right) {
            let lvalue = Number(this.list[i].getAttribute("value"));
            let rvalue = Number(this.list[j].getAttribute("value"));
            if(lvalue <= rvalue) {
                ls.push(lvalue);
                ++i;
            }
            else {
                ls.push(rvalue);
                ++j;
            }
        }

        while( i <= mid){
            let val = Number(this.list[i].getAttribute("value"));
            ls.push(val);
            ++i;
        }
        while( j <= right){
            let val = Number(this.list[j].getAttribute("value"));
            ls.push(val);
            ++j;
        }

        for(let x = left; x <= right ; ++x) {
            this.list[x].setAttribute("class", "bar current");
        }
        for(let x = left, y = 0 ; x <= right && y < ls.length; 
            ++x, ++y) {
                await this.util.pause();
                this.list[x].setAttribute("value", ls[y]);
                this.list[x].style.height = `${4.0*ls[y]}px`;
        }
        for(let x = left ; x <= right ; ++x) {
            this.list[x].setAttribute("class", "bar");
        }
    }

    //Quick Sort
    QuickSort = async () => {
        await this.QuickReduce(0, this.size-1);
        for(let i = 0 ; i < this.size ; ++i) {
            this.list[i].setAttribute("class", "bar done");
        }
    }

    QuickReduce = async (left, right) => {
        if(left < right) {
            let pivot = await this.Partition(left, right);
            await this.QuickReduce(left, pivot-1);
            await this.QuickReduce(pivot+1, right);
        }
    }

    Partition = async (left, right) => {
        let pivot = this.list[right].getAttribute("value");
        let prevIndex = left - 1;

        await this.util.markMin(right);
        for(let i = left ; i < right ; ++i) {
            let currValue = Number(this.list[i].getAttribute("value"));
            await this.util.mark(i);
            if(currValue < pivot) {
                prevIndex += 1;
                await this.util.mark(prevIndex);
                await this.util.swap(i, prevIndex);
                await this.util.unmark(prevIndex);
            }
            await this.util.unmark(i);
        }
        await this.util.swap(prevIndex+1, right);
        await this.util.unmark(right);
        return prevIndex + 1;
    }

};