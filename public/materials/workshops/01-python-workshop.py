# a = -12 # int
# b = 12.120 # float
# c = "hello world!" # string
# d = True # boolean

# print(int(d))
# print(bool(a))
# print(str(b))
# print(int(c)) # error
# print(int("12"))
# print(type(c))

# # this is a comment
# # سلام علیکم

# '''
# hello world
# '''

# helloWorld = "hello world!"
# hello_world = "hello world!"

# for int and float :
# print(2 * 3)
# print(2 + 2)
# print(2 - 4)
# print(5 / 2) # 2.5000 
# print(5 // 2) # 2
# print(5 % 2) # 1
# print(2 ** 5) # 2 ^ 5

# print(2 & 3) # 2 and 3   000000010 & 000000011
# print(2 ^ 3) # 2 xor 3   000000010 ^ 000000011

# for str :
# print("hello " + "world!")
# print("a" * 8)
# arshia = "Hello World !"
# print(arshia[0])
# print(arshia[1:4])
# print(arshia[1:8:2])
# print(arshia[::-1])
# print(arshia.lower())
# print(arshia.upper())
# print(arshia.split())

# name = "soheil"
# print("hello " + name)
# a = 12
# b = 13
# c = 14
# print("a = " + str(a) + ", b = " + str(b) + ", c = " + str(c))
# print(f"a = {a}, b = {b}, c = {c}")

# # for bool :
# t = True
# f = False
# print(t and f and not t)
# print(t or f)
# print(not t)

# list :
# students_number = [12, 13, 15, 18, 10]
# students_number[0] = 7
# students_number.append(13) # add 13
# students_number.sort()
# students_number.remove(12)
# students_number.insert(2, 8)
# print(len(students_number))
# students_number.reverse()
# print(students_number[::-1])
# print(students_number)
# print([1,2] + [3, 4])

# tuple :
# t = (12, 14, 11)
# print(t[1])
# t[0] = 13

# set :
# u = {1, 2, 2, 3, 4, 5}
# print(u[0]) # error
# u.add(10)
# print(u.intersection({1,2,3,7}))
# print(u.union({7, 1, 25}))
# u.remove(1)
# print(u)

# dict :
# student_list = ["soheil", "123"] # is not good
# student = {"name" : "soheil", "code" : "123"}
# print(type(student))
# print(student["name"])


# name = input("enter your name: ")
# print(f"hello {name}")

# grade = int(input("grade : "))
# if grade > 20 or grade < 0:
#     print("wrong grade")
# elif grade == 20: # = and ==
#     print("good")
# elif grade >= 10 :
#     print("pass")
# else:
#     print("fail")

# password = input("enter new password: ")
# while len(password) < 8 :
#     password = input("try again ")

# number = int(input())
# i = 2
# while number % i != 0:
#     i += 1
# if (number == i):
#     print("prime")
# else:
#     print("not prime")

# i = 1
# while i <= 10:
#     print(i, end = " ")
#     i += 1 # i = i + 1

# for i in range(1, 11, 2):
#     print(i)

# number = int(input())
# is_number_prime = True
# for i in range(2, int(number ** 0.5 + 1)):
#     # pass
#     if (number % i == 0):
#         is_number_prime = False
#         print("not prime")
#         break
# if is_number_prime:
#     print("prime")

# for j in range(12):
#     if j == 8:
#         continue
#     print(j, end = " ")

# print()
# a = [1, 2, 3]
# print(min(a))

# print(print("hello world"))
# def is_prime(number : int):
#     is_number_prime = True
#     for i in range(2, int(number ** 0.5 + 1)):
#         if (number % i == 0):
#             is_number_prime = False
#             break
#     return is_number_prime

# print(is_prime(int(input())))

# time : O(n!)
def fib_1(number):
    if (number == 1 or number == 2):
        return 1
    return fib_1(number - 1) + fib_1(number - 2)

# time : O(n)
def fib_2(number):
    if (number == 1 or number == 2):
            return 1
    number -= 2
    a = 1
    b = 1
    while(number > 0):
        b += a
        a = b - a
        number -= 1
    return b

# time : O(log n)

# number = int(input())

# import time
# t0 = time.time()
# print(fib_1(number))
# t1 = time.time()
# print(fib_2(number))
# t2 = time.time()

# print(f"fib 1 : {t1 - t0}, fib 2 : {t2 - t1}")
# print((t2 - t1)/(t1 - t0))

# import math, time, random