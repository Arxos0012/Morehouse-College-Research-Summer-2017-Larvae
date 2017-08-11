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

* **Collaborators**

  * ***Dr. Dwayne Joseph, Project Leader*** -

    Assistant Professor of Morehouse College's Department of Physics
    and Dual-Degree Engineering.

    Department Faulty Listing:
    http://www.morehouse.edu/academics/physics/faculty.html

  * ***Orondé Jabari Booker, Lead Programmer*** -

    Undergraduate Computer Science major of Washington University in St. Louis.
    Class of 2020

    LinkedIn Page: https://www.linkedin.com/in/oronde-booker-602443a9

    Github Profile: https://github.com/Arxos0012
