/*
package com.sunlife.groupweb.member;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;



public class Selenium {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        driver.get("http://localhost:9080/MemberCoverageForms/");

        WebElement formElement = driver.findElement(By.id("loginForm"));
        WebElement usernameElement = driver.findElement(By.name("username"));
        WebElement passwordElement = driver.findElement(By.name("password"));

        usernameElement.sendKeys("admin");
        passwordElement.sendKeys("sunlife");
        formElement.submit();

        WebDriverWait wait = new WebDriverWait(driver, 10);
        WebElement messageElement = wait.until(ExpectedConditions.elementToBeClickable(By.))
    }
}
*/
