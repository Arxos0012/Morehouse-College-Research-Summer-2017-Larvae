# The Mathematics behind the detectElevation funtion
***- Orondé Jabari Booker***

    var ...,
        avg = [0,0],
        lastPt = 0,
        currPt = 0,

        variance = [0,0],
        lambda = [0,0],
        ...;

    while(true){

      ...

      avg[0] += (currPt[0] - lastPt[0])/10;
      avg[1] += (currPt[1] - lastPt[1])/10;

      if(!refEstablished){
        lambda[0] += ((currPt[0]**2) - (lastPt[0]**2))/10;
        lambda[1] += ((currPt[1]**2) - (lastPt[1]**2))/10;

        variance[0] = lambda[0] + (avg[0]**2);
        variance[1] = lambda[1] + (avg[1]**2);

        ...
      }
      //breaking at some point here
      ...
    }

    How does this represent mean and variance?

**Introduction**

In order to program the Sphero to accurately detect a change in elevation, I
decided to compute the arithmetic mean and variance of the last 10 reported
values from the robot's gyroscopic sensor. The mean was calculated to represent
the Sphero's current orientation in order to reduce the noise in data caused by
slight offsets in the Sphero's path. The variance was used to determined when
the Sphero finished it's initial acceleration from rest.

As I wrote the detectElevation() function, the Sphero app would return an error
whenever I tried to use for loops to compute the mean and variance. That error
claimed that the for loops “ran too long without yielding”. I’m not entirely
sure why this occurred, but my best guess would be that it was due to a
limitation in the amount of memory and computational power of the Sphero. To
circumvent this, I reinterpreted the definitions of for mean and variance.

**Problem with For Loops**

![](res/mean.png)

![](res/variance.png)

The bulk of the code runs within an endless while loop, out of which we will
break once a change in elevation is successfully detected, thus ending the
program.

Below is an example of code that show what computing the mean and variance of
the last ten reported values would look like:


      var vals = [0,0,0,0,0,0,0,0,0,0];

      while(true){
        var i,
            sum = 0;

        for(i=0; i<10; i++){
          sum += vals[i];
        }

        var mean = sum / 10;
        i = 0;
        sum = 0;

        for(i=0; i<10; i++){
          sum += (vals[i] - mean)**2;
        }

        var variance = sum / 10;
      }

Here we can see that computing the mean and variance in this manner results in a
complexity of O(n) for each iteration of the while loop (2 summations of n
values; n equaling 10 in this case). Considering the performance issues, I aimed
for a complexity less than O(n), like O(1) or O(log n). To do this I simplified
the process of computing a sum, and to show this I will use a thought experiment.

**Simplifying Summation**

Say that I am trying compute the sum of the last four values from a continuously
updating queue of values (similar to our gyroscopic sensor). Let's say that the
first four values are: a, b, c, and d. In that case the mean will be:

![](res/exampleSum0.png)

Now let's observe what happens when the fifth value is recorded, e. Since we are
only computing the mean for the last four values, the first, a, is replace with
e. So the mean is now:

![](res/exampleSum1.png)

This can be rewritten as follows:

![](res/sumRewrite0.png)

![](res/sumRewrite1.png)

Now let's define the α and ß as follows:

![](res/alpha.png)

![](res/beta.png)

It's now obvious that α equals the previously calculated summation and ß is
simply the difference between the newest recorded value and the value recorded
four iterations ago.
