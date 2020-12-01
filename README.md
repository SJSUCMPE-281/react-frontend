# CMPE281-Project

* University Name: [San Jose State University](http://www.sjsu.edu/)
* Course: [Cloud Technologies](http://info.sjsu.edu/web-dbgen/catalog/courses/CMPE281.html)
* Professor [Sanjay Garje](https://www.linkedin.com/in/sanjaygarje/)
* Student: [Anisha Agarwal](https://www.linkedin.com/in/anisha25)
* Student: [Arshia Sali](https://www.linkedin.com/in/arshia-sali-842417101/)
* Student: [Jeena Thampi](http://linkedin.com/in/jeena-thampi-61a350b3)
* Student: [Priti Sharma](https://www.linkedin.com/in/priti-sharma-68b60b64)

## Project Introduction
The application provides a platform where it simplifies the process of running an online store for small/medium merchants in the “New Normal”.

Solution by Application: 
1.	The application helps to create business for small/medium Merchants.
2.	Provides customers with the convenience to buy the products they need instantly from anywhere provided they can access to the internet.
3.	Payment and Order Management is handled by the application.

Solution for Merchants:
1.	It helps the merchants by creating a shop which is free, however costs will be added for the listings posted by them.
2.	The price of the product will be set by the shop owner.
3.	Seller do not have to have SaaS Shoppe account, instead they can login through Google/Facebook account.

Solution for Customers:
1.	Potential buyers can type their products on the search bar or browse through the list options on the homepage which will include all the items listed by the sellers.
2.	Feedback will be available for each of the product so that buyer can determine the reliability of the product/shop.
3.	Buyer do not have to have SaaS Shoppe account, instead they can login through Google/Facebook account.

## Feature List
1.	Multi-Tenant platform (Seller's and Buyer's).
2.	Seller's can add Shops and products with their images.
3.	Buyer's can add the product to Cart and do Checkout.
4.	Order status for both the tenants (shipped/placed).
5.	Payment feature.
6.	Notification via SMS and Email.
7.	OAUTH for Facebook.

## Architecture
- **Architecture**

![Architecture](https://github.com/SJSUCMPE-281/react-frontend/blob/master/images/project281%20(1).jpg)

## Demo ScreenShots
- **Home Page**

![Home Page](https://github.com/SJSUCMPE-281/react-frontend/blob/master/images/HomePage.png)

- **Sorting according to price Page**

![Sorting according to price Page](https://github.com/SJSUCMPE-281/react-frontend/blob/master/images/Sort-price.png)

- **Search Bar Page**

![Search Bar Page](https://github.com/SJSUCMPE-281/react-frontend/blob/master/images/search-bar.png)

- **Search Bar Result Page**

![Search Bar Result Page](https://github.com/SJSUCMPE-281/react-frontend/blob/master/images/serach-bar-result.png)

- **Contact Us**

![Contact Us](https://github.com/SJSUCMPE-281/react-frontend/blob/master/images/contactus.png)

## Pre-requisites Set Up

Resources to configure in CLoud:
1. 	Elastic Beanstalk- To Deploy the application.
2.	S3- Efficient and secure data storage of products images in AWS S3 bucket.
3.	RDS- For storing details of Seller and Buyer.
4.	Elastic Search – For implementing highly scalable open-source full-text search and analytics engine, for customer search bar. 
5.	Redis Cache- For implementing highly available in-memory cache to decrease data access latency, increase throughput, and ease the load off on database and application.
6.	DynamoDB- For implementing elastic search functionality.
7.	SNS & Lambda- SNS notification service, using Lambda function which will trigger event for SNS.
8.	SQS- To publish Data from SNS.
9.	Cognito- For user management and secure access to the application.
10.	Route53- To route users to application by translating domain of the application to IP Addresses.

Resouces/Software to download Locally:

1.	Stripe developer Account- To implement Payment functionality.
2.	SendGrid developer Account- To implement Email Notification.
3.	Twilio developer Account- To implement SMS Notification.
4.	Facebook developer Account- To implement OAUTH.
4.	Create a Spring Boot Project from: https://start.spring.io/
5.	Download Eclipse IDE from: https://www.eclipse.org/downloads/packages/release/neon/2/eclipse-ide-java-developers
6.	Install Node.js from: https://nodejs.org/en/download/
7.	Download Visual Studios from: https://code.visualstudio.com/
8.	Clone the repository from: https://github.com/SJSUCMPE-281/react-frontend.git
							   https://github.com/SJSUCMPE-281/SellerService.git
							   https://github.com/SJSUCMPE-281/UserManagementService.git
							   https://github.com/SJSUCMPE-281/BuyerService.git
9.	Create all the above mentioned cloud resources.
10.	Add .env file with all the necessary and required credentials from cloud and other third party integration.	
