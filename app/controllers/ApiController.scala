package controllers

import javax.inject._
import play.api.mvc._
import scala.util.Random

@Singleton
class ApiController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  def word(): Action[AnyContent] = Action {
    val words = Seq("which", "there", "their", "about", "would", "these", "other", "words", "could", "write", "first", "water", "after", "where", "right", "think", "three", "years", "place", "sound", "great", "again", "still", "every", "small", "found", "those", "never", "under", "might", "while", "house", "world", "below", "asked", "going", "large", "until", "along", "shall", "being", "often", "earth", "began", "since", "study", "night", "light", "above", "paper", "parts", "young", "story", "point", "times", "heard", "whole", "white", "given", "means", "music", "miles", "thing", "today", "later", "using", "money", "lines", "order", "group", "among", "learn", "known", "space", "table", "early", "trees", "short", "hands", "state", "black", "shown", "stood", "front", "voice", "kinds", "makes", "comes", "close", "power", "lived", "vowel", "taken", "built")

    val random = new Random
    val word = words(
      random.nextInt(words.length)
    )

    Ok(word)
  }

}