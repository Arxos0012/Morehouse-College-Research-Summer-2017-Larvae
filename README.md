# Morehouse-College-Research-Summer-2017-Larvae

* **Description**

  The purpose of this project was to program the Sphero 2.0 to be able to move
  in various different ways in order to later use the robot to simulate the
  behavior or larvae.


* **Functions**

  * travel(locX, locY)

        The Sphero will turn in the direction of and then travel towards a
        specified location.

        Parameters:
            locX - the x coordinate of the target destination (in cm)
            locY - the y coordinate of the target destination (in cm)

            NOTE: locX and locY reference the xy-coordinate of a destination
            relative to the Sphero's location and orientation.

  * sine(durr)

        The Sphero will move in a sinusoidal pattern for a given duration.

        Parameters:
          durr - duration of time for which to run (in seconds)

  * circle(durr)

        The Sphero will move in a circular pattern for a given duration.

        Parameters:
          durr - duration of time for which to run (in seconds)

  * pendulum(durr, sweep)
        The Sphero will move back and forth in an arc, speeding up and slowing
        down, mimicking the swing of a pendulum.

        Parameters:
          durr - duration of time for which to run (in seconds)
          sweep - the angle of arc of the Sphero's movement (in degrees)

  * detechElevation()

        The sphero will move forward. Once it is certain of a change in elevation,
        the sphero will stop and change its main light to be red, indicating the
        end of the program.

* **How do I use this code for _my_ Sphero?**

  To use this code on your Sphero robot, download the _Sphero Edu - Coding for
  Sphero_ app for
  [iOS](https://itunes.apple.com/us/app/sphero-edu-coding-for-sphero-robots/id1017847674?mt=8)
  or
  [Android](https://play.google.com/store/apps/details?id=com.sphero.sprk&hl=en).
  Simply copy and paste the Javascript code from this repository into a new
  Javascript program and you're good to go!

  For more information on how to program the Sphero, us the following sites:

  * About Page: https://edu.sphero.com/about

  * Sphero Javascript Programming wiki: https://sphero.docsapp.io/docs/get-started



* **Collaborators**

  * _**Dr. Dwayne Joseph**, Project Leader_ -

    Assistant Professor of Morehouse College's Department of Physics
    and Dual-Degree Engineering.

    Department Faulty Listing:
    http://www.morehouse.edu/academics/physics/faculty.html

  * _**Orondé Jabari Booker**, Lead Programmer_ -

    Undergraduate Computer Science major of Washington University in St. Louis.
    Class of 2020

    LinkedIn Page: https://www.linkedin.com/in/oronde-booker-602443a9

    Github Profile: https://github.com/Arxos0012
