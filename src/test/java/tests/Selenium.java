/*
package tests;

import environment.EnvironmentManager;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.Assert.assertEquals;


public class Selenium {

    @Before
    public void startBrowser() {
        EnvironmentManager.initiWebDriver();
    }

    @Test
    public void test() {
        WebDriver driver = RunEnvironment.getWebDriver();

        driver.get("http://localhost:9080/MemberCoverageForms/");

        WebElement formElement = driver.findElement(By.id("loginForm"));
        WebElement usernameElement = driver.findElement(By.name("username"));
        WebElement passwordElement = driver.findElement(By.name("password"));

        usernameElement.sendKeys("admin");
        passwordElement.sendKeys("sunlife");
        formElement.submit();

        WebDriverWait wait = new WebDriverWait(driver, 10);
        WebElement testTarget = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("testTarget")));
        String testTargetString = testTarget.getText();

        System.out.println("made it to the end I guess?");
        System.out.println(testTargetString);

        assertEquals(testTargetString, "Source System");

        driver.quit();
    }

    @After
    public void tearDown() {
        EnvironmentManager.shutDownDriver();
    }
}
*/
